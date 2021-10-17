import styles from './Todo.module.scss'
import { HiPlus } from "react-icons/hi"
import Link from 'next/link'
import {useRouter} from 'next/router'

function Todo({text="", color="grey", id, deleteTodo}) {
    const router = useRouter()

    return (
        <div className={router.query.id === id? `${styles.Item} ${styles.active}` : styles.Item}>
            <Link href={`/notice/${id}`}> 
                <a >
                    <div className={styles.ItemBadge} style={{background: color}}></div>
                    <div className={styles.ItemText}> {text} </div>
                </a>
            </Link>
            <div onClick={() => deleteTodo(id)} className={styles.ItemDelete}><HiPlus/> </div>
        </div>
       
    )
}

export default Todo
