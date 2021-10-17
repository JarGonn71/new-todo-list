import { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const [state, setstate] = useState([])
    //Состояние редактирования TODO
  const [change, setChange] = useState(false)

  //Получение данных для сайдбара
  useEffect( async () => {
    const rez = await axios.get('https://jargon-todo.herokuapp.com/api/notice/')
    setstate(rez.data)
  }, [pageProps])


  return <Component {...pageProps} state={state} change={change} setChange={setChange}/>
}

export default MyApp
