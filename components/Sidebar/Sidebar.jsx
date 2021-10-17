import styles from './Sidebar.module.scss'
import { HiMenuAlt1, HiPlus } from "react-icons/hi";
import Todo from '../TodoSidebar/Todo';
import Link from 'next/link';
import {useRouter} from 'next/router'
import axios from 'axios';

function Sidebar({state, setAddTodo}) {
   const router = useRouter()
    
    const showWindow = () =>{
        setAddTodo(prev => !prev)
    }

    const deleteTodo = async (id) => {
        // const newState = state.filter(item => item._id != id)
        try{
            await axios.delete(`https://jargon-todo.herokuapp.com/api/notice/delete/${id}`).then(()=>{
                router.push('/') 
            })
          }catch(error){
              console.log(error)
          }
    }

    const todoList = state && state.map((item, index)=>{return <Todo key={item._id} text={item.title} color={item.color} id={item._id} deleteTodo={deleteTodo}/> })


    return (
        <div className={styles.ContainerSidebar}>
            <Link href='/'><a className={styles.title}><HiMenuAlt1/> Все задачи</a></Link>
            <div className={styles.blockItems}>
                {todoList}
            </div>
            <div onClick={showWindow}  className={styles.AddTodo}><HiPlus/> Добавить папку</div>
        </div>
    )
}


export default Sidebar

