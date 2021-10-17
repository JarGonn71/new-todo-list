import '../styles/globals.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [state, setstate] = useState([])
  const [change, setChange] = useState(false)
  console.log("pageProps", pageProps)

  useEffect( async () => {
    const rez = await axios.get('https://jargon-todo.herokuapp.com/api/notice/')
    setstate(rez.data)
  }, [pageProps])


  return <Component {...pageProps} state={state} change={change} setChange={setChange}/>
}

export default MyApp
