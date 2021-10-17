import styles from './TodoBox.module.scss'
import { BsFillCircleFill, BsFillCheckCircleFill, BsFillBookmarkStarFill, BsPencilSquare } from "react-icons/bs";
import Link from 'next/link'
import {useRouter} from 'next/router'


export default function TodoBox({_id, title, todo, color, setChange}) {
    const router = useRouter()
    const newTodo = todo.slice(0, 2)
    const changeTodo = () =>{
        setChange(true)
        router.push(`/notice/${_id}`)
        
    }

    const items = newTodo.map((item, index) => {return <div className={styles.item} key={index}>
            {item.progress? <BsFillCheckCircleFill color="#04ae04"/> : <BsFillCircleFill color="#a6a4a4"/> }
            <span>{item.text}</span>
        </div>})


    return (
        <div className={styles.wrapper}>
            <div style={{color: `${color}`}} className={styles.title}>
                <BsFillBookmarkStarFill color={`${color}`}/>
                {/* <div style={{background: `${color}`}} className={styles.badge}></div> */}
                <Link href={`/notice/${_id}`}><a>{title}</a></Link> 
                <div onClick={changeTodo} className={styles.btn}><BsPencilSquare/></div>

            </div>
            <div className={styles.line}></div>
            <div className={styles.containerTodo}>
                {items}
            </div>
        </div>
    )
}

