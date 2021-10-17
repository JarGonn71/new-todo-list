import Lauout from "../layout/Lauout"
import TodoBox from "../components/TodoBox/TodoBox"
import {useEffect} from 'react';

import styles from '../styles/Home.module.scss'

export default function Home({data = [], state, setChange}) {

  const listTodo = data.map((item, index) => {return <TodoBox key={item._id} {...item} setChange={setChange}/>})

  useEffect(() => {
    setChange(false)
  }, [])

  return (
    <Lauout state={state}>
      <div className={styles.wrapperHome}>
          {listTodo}
      </div>
    </Lauout>
    

  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://jargon-todo.herokuapp.com/api/notice/`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {data}, // will be passed to the page component as props
  }
}