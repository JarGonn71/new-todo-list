import styles from './AddTodo.module.scss'
import { useState , useRef, useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import {HiPlus} from "react-icons/hi";


const colorList = ["#C9D1D3", "#42B883", "#64C4ED", "#FFBBCC", "#B6E6BD", "#C355F5", "#09011A", "#FF6464" ]

export default function AddTodo({setAddTodo}) {
    const [activeColor, setActiveColor] = useState("#C9D1D3")
    const [value, setValue] = useState('')
    const MyPlaceholder = "Новая заметка"
    const windowRef = useRef()
    const router = useRouter()

    const colorItems = colorList.map((item, index) => { return <div style={{background: `${item}`}} 
                className={activeColor === item ? `${styles.color} ${styles.active}` :styles.color} 
                key={index}
                onClick={() => {setActiveColor(item)}}>             
            </div>
        })


    useEffect(() => {
        document.addEventListener('click', clickClose)
        return function(){
            document.removeEventListener('click', clickClose)
        }
    }, [])


    const clickClose = (e) => {
        const paths = e.path
        if (!paths.includes(windowRef.current)){
            setAddTodo(false)
        }
    }    

    const handleSubmit = async () => {
        let time = new Date()
        let options = !value? { title: MyPlaceholder, todo: [], timeInfo: time, color: activeColor} 
        : { title: value, todo: [], timeInfo: time, color: activeColor}
        try{
            await axios.post('https://jargon-todo.herokuapp.com/api/notice/add', options).then(() =>{
                setAddTodo(false)
                router.push('/') 
            })
        }catch(error){
            console.log(error)
        }
    } 


    return (
        <div ref={windowRef} className={styles.wrapperWindow}>
            <input autoFocus onChange={(e) => setValue(e.target.value)} value={value} type="text" placeholder={MyPlaceholder} />
            <div className={styles.colorItems}>
                {colorItems}
            </div>
            <div onClick={handleSubmit} className={styles.btn}>Добавить</div>
            <HiPlus onClick={()=>setAddTodo(false)}/>
        </div>
    )
}

