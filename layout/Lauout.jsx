import Head from 'next/head'
import Sidebar from '../components/Sidebar/Sidebar'
import { useState } from 'react';
import AddTodo from '../components/windowAddTodo/AddTodo'


export default function Lauout({title='Next | TODO', children, state }) {

    const [addTodo, setAddTodo] = useState(false)
 

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <main className="wrapperApp">
                {addTodo && <AddTodo setAddTodo={setAddTodo}/>}
                <Sidebar setAddTodo={setAddTodo}  state={state}/>
                {children}
            </main>


        </>
    )
}


