import Lauout from '../../layout/Lauout'
import { useRouter } from 'next/router'
import TodoBoxPage from '../../components/TodoBoxPage/TodoBoxPage'
import styles from '../../styles/TodoPage.module.scss'

export default function TodoPageId({notice, state, setChange, change}) {
    const router = useRouter()


    return (
        <Lauout state={state}>
              <div className={styles.wrapper}>
                <div className={styles.container}>
                  <TodoBoxPage {...notice} setChange={setChange} change={change}/>
                </div> 
              </div>  
        </Lauout>
    )
}


export async function getServerSideProps(context) {
    const res = await fetch(`https://jargon-todo.herokuapp.com/api/notice/${context.query.id}`)
    const notice = await res.json()
  

    if (!notice) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {notice}, // will be passed to the page component as props
    }
  }

