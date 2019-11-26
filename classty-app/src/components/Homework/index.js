import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Homework({ history }) {

    const { user, setUser } = useContext(Context)

    const [notDel, setNotDel] = useState(undefined)

    const [del, setDel] = useState(undefined)

    const [update, setUpdate] = useState(false)


    const id = history.location.pathname.split('/').pop()

    function reverse(str) {
        return str.split("-").reverse().join("-");
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, comment: { value: comment }, date: { value: date } } } = event 
        debugger
        document.getElementById('area').value = ""
        document.getElementById('ex').value = ""
        handleCreateHomeWork(id, title, comment, date)
    }

    async function handleCreateHomeWork(id,title, comment, date){
        try {

            await logic.homework.createHomework(id,title, comment, date)
            debugger
            const del = await logic.homework.retrieveHomeworks(id)
            debugger
            setDel(del)
            setUpdate(!update)

        } catch (error) {

            console.log(error.message)
        }
    }

    function handleNotDone(event) {
        event.preventDefault()
        const { target: { done: { value: idH } } } = event
        debugger
        handleNotDelivery(id, idH)
    }

    async function handleNotDelivery(id, idH) {

        try {

            await logic.homework.notDelivery(id, idH)
            debugger
            const notDel = await logic.homework.retrieveNotDel(id);
            debugger
            setNotDel(notDel)
            const del = await logic.homework.retrieveDel(id)
            debugger
            setDel(del)

        } catch (error) {

            console.log(error.message)
        }
    }

    function handleDone(event) {
        event.preventDefault()
        const { target: { done: { value: idH } } } = event
        debugger
        handleDelivery(id, idH)
    }
    async function handleDelivery(id, idH) {

        try {

            await logic.homework.delivery(id, idH)
            debugger
            const notDel = await logic.homework.retrieveNotDel(id);
            debugger
            setNotDel(notDel)
            const del = await logic.homework.retrieveDel(id)
            debugger
            setDel(del)

        } catch (error) {

            console.log(error.message)
        }
    }

    useEffect(() => {
        (async () => {
            const user = await logic.user.retrieveUser()
            setUser(user)
            if (user && user.type == 'student') {
                debugger
                const notDel = await logic.homework.retrieveNotDel(id);
                debugger
                setNotDel(notDel)
                const del = await logic.homework.retrieveDel(id)
                debugger
                setDel(del)
            } else {debugger
                const del = await logic.homework.retrieveHomeworks(id)
                debugger
                setDel(del)
            }
        })()
    }, [update])
debugger
    return <>
        <Header />
        <main className='homework'>
            <div className='ho'>
            {user && user.type == 'student' &&
                <ul className='ho__ul'>
                    <h2 className='ho__h2'>To-Do</h2>
                    <div className='ho__div--overflow'>
                    {notDel && notDel.length > 0 && notDel.map(({ comment, title, expiry, _id }) => {
                        debugger
                        return <li className='ho__li' key={_id}>
                            <h3 className='ho__h3'>{title}</h3>
                            <p className='ho__p'>{comment}</p>
                            <time className='ho__time'>expiry: {reverse(expiry.slice(0, 9))}</time>
                            <form onSubmit={handleDone}>
                                <button className='ho__button' name="done" type="submit" value={_id}>Done</button>
                            </form>
                        </li>
                    })
                        }
                        </div>
                </ul>}
                
            {user && user.type == 'student' && 
            <ul className='ho__ul'>
                <h2 className='ho__h2'>Done</h2>
                <div className='ho__div--overflow'>                
                {del && del.length > 0 && del.map(({ comment, title, expiry, _id }) => {
                    debugger
                    return <li className='ho__li' key={_id}>
                        <h3 className='ho__h3'>{title}</h3>
                        <p className='ho__p'>{comment}</p>
                        <time className='ho__time'>expiry: {reverse(expiry.slice(0, 9))}</time>
                        <form onSubmit={handleNotDone}>
                            <button className='ho__button--red' name="done" type="submit" value={_id}>Rewiev</button>
                        </form>
                    </li>
                }) }
       </div>     </ul>}</div>
            {user && user.type == 'teacher' &&<> 
                <h2 className='homework__h2'>Create Homework</h2> 
                <form className='homework__form' onSubmit={handleSubmit}>
                    <input className='homework__input' type='text' id='ex' name='title' placeholder='title' />
                    <textarea className='homework__textarea' name="comment" id="area" cols="30" rows="5" placeholder="Comment" />
                    <input className='homework__input' type='date' id='ex' name='date' placeholder='date' />
                    <button className='homework__button'>Create</button>
                </form>
                </>}
            {user && user.type == 'teacher' &&<>
             <h2 className='homework__h2'>Homeworks</h2>
                 <ul className='homework__ul'>
                    
                    {del && del.length > 0 && del.map(({ comment, title, expiry, delivery }) => {
                        debugger
                        return <li key={expiry+title} className='homework__li'>
                            <h3 className='homework__h3'>{title}</h3>
                            <p className='homework__p'>{comment}</p>
                            <time className='homework__time'>expiry: {reverse(expiry.slice(0, 9))}</time>
                           <ul className='homework__ul--list' >
                               {delivery && delivery.length > 0 && delivery.map(({name, surname})=>
                               <li key={surname+name} className='homework__li'>
                                   <h4>{name+" "+surname}</h4>
                               </li>
                               )}
                           </ul>
                        </li>
                    })
                    ||
                        <p>There are not any tasks registered</p>}
                </ul></>}


        </main>
    </>
}
export default withRouter(Homework)