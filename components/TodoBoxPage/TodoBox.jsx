import styles from './TodoBoxPage.module.scss'
import { BsFillCircleFill, BsFillCheckCircleFill} from "react-icons/bs";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { useState, useRef, useEffect } from 'react';

export default function TodoBox({item, setProgress, setText, change, deleteTodo}) {
    const [value, setValue] = useState(item.text)
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        document.addEventListener('click', clickClose)
        
        return function(){
            document.removeEventListener('click', clickClose)
        }
    }, [])


    const clickClose = (e) => {
        const paths = e.path
        if (paths[0] === inputRef.current){
            setShowInput(false)
        }
    }    

    const changeValueTodo = () =>{
        setText(item, value)
        setShowInput(false)
    }

    return (
        <div className={styles.item}>
            <div className={change? `${styles.wrapperText} ${styles.active}` : styles.wrapperText}>
                <div onClick={(e)=>{setProgress(item)}}> {item.progress? <BsFillCheckCircleFill color="#04ae04"/> : <BsFillCircleFill color="#a6a4a4"/> }</div>
              
                 <span>{item.text}</span>
                 {change && <FiEdit3 onClick={()=>{setShowInput(prev=>!prev)}}/>}
            </div>
            {showInput && <div ref={inputRef} className={styles.windowInput}>
                            <div  className={styles.wrapperInput}>
                                <input autoFocus type="text" placeholder="Введите текст" value={value} onChange={(e)=>{setValue(e.target.value)}} />
                                <div onClick={changeValueTodo} className={styles.windowSubmit}> Изменить</div>
                            </div>
                        </div> 
            }
            
            {change && <FiTrash onClick={()=> deleteTodo(item)}/>}
        </div>
    )
}


