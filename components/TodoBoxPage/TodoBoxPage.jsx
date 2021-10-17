import styles from './TodoBoxPage.module.scss'
import { BsFillBookmarkStarFill, BsPencilSquare, BsPlusLg} from "react-icons/bs";
import TodoBox from './TodoBox';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoBoxPage({_id, title, todo, color, setChange, change}) {
    const [todoList, setListTodo] = useState(todo)
    const [newTitle, setNewTitle] = useState(title)
    const [activeColor, setActiveColor] = useState(color)
    const [newTodoText, setNewTodoText] = useState('')

    //Получение свежих данных с сервера
    useEffect( async () => {
        try{
            const rez = await axios.get(`http://localhost:5000/api/notice/${_id}`)
            setListTodo(rez.data.todo)
            setNewTitle(rez.data.title)
            setActiveColor(rez.data.color)
          }catch(error){
              console.log(error)
          } 
      }, [change, todo])

    const changeTodo = () =>{
        setChange(prev=>!prev)
    }

      //Изменение флажка progress
    const setProgress = (item) => {
        if(change){
            let newItem = {...item}
            newItem.progress = !newItem.progress
            const options = todoList.map((obj, index) => {return obj === item? newItem : obj})
            setListTodo(options)
        }
    }

    //Изменение текста у TODO
    const setText = (item, value) => {
        if(value){
            let newItem = {...item}
            newItem.text = value
            const options = todoList.map((obj, index) => {return obj === item? newItem : obj})
            setListTodo(options)
        }
            
    }

    //Удаление TODO
    const deleteTodo = (item) => {
        const options = todoList.filter(todoItem => todoList.indexOf(todoItem) != todoList.indexOf(item))
            setListTodo(options)
    }

    //Добавление TODO
    const setAddTodoPage = () =>{
        if(newTodoText){
            setListTodo([ ...todoList, {text: newTodoText, progress: false}])
        }
        setNewTodoText('')
    }

    //Изменение данных и отправка их на сервер
    const changeNotice = async () => {
        const options = {
            title: newTitle,
            todo: todoList,
            color: activeColor
        }
        try{
            await axios.post(`https://jargon-todo.herokuapp.com/api/notice/update/${_id}`, options).then((r)=>{
                setChange(false)
            })
          }catch(error){
              console.log(error)
          }

    }

    const items = todoList.map((item, index) => {return <TodoBox 
            key={index} 
            item={item} 
            setProgress={setProgress} 
            setText={setText} 
            change={change}
            deleteTodo={deleteTodo}
        />})

    return (
        <>
            <div className={styles.wrapper}>
                <div style={{color: `${activeColor}`}} className={styles.title}>
                    <BsFillBookmarkStarFill color={`${activeColor}`}/>
                    {!change? title :<input placeholder="Введите название" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} />}
                    <div onClick={changeTodo} className={styles.btn}><BsPencilSquare/></div>

                </div>
                <div className={styles.line}></div>
                {
                change  && <div className={styles.btnAddTodo}>
                                <input placeholder="Введите текст" value={newTodoText} onChange={(e)=>{setNewTodoText(e.target.value)}}/>
                                <span onClick={setAddTodoPage}><BsPlusLg/> Добавить задачу </span>
                            </div>
                }
                <div className={styles.containerTodo}>
                    {items}
                </div>
            </div>

            {change && <div onClick={changeNotice} className={styles.submitBtn}>Сохранить изменения</div>}
        </>
        
    )
}

