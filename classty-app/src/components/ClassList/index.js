import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'
import Feedback from '../Feedback'

function ClassList({ history }) {
    const { classes, setClasses, error, setError } = useContext(Context)
    const [ update, setUpdate ] = useState(false)

 function handleSubmit(event){
        event.preventDefault()
        debugger
        const {target:{ nameClass: { value: nameClass } } } = event
        handleRegister(nameClass)
    }
    
    async function handleRegister(nameClass){

        try{
            
            await logic.classes.registerClass(nameClass)
            setUpdate(!update)
            document.getElementById('a').value = ''
        }catch({message}){debugger
            setError(message)
        }
    }
    useEffect(() => {
        (async () => {
            setError(undefined)
            const classes = await logic.classes.retrieveClasses();
            setClasses(classes)

        })()
    }, [update])

    return <>
        <Header />
        <div className='class-list'>
        <main className='class-list'>
        <section className='class-list__section'>
        <h2 className='class-list__h2'>Create Class</h2>
        <form className='class-list__form' onSubmit={handleSubmit}>
            <input className='class-list__input' type="name" id='a' name="nameClass" placeholder="name subject"/>
            <button className='class-list__button'>Submit</button>
        </form>
        {error&&<Feedback error={error}/>}
        </section>
            <section className='class-list__section'>
                <ul className='class-list__ul'>


                    {classes && classes.length > 0 && classes.map(({ name }) =>


                        <li key={name} className='class-list__li'>{name}</li>

                    )}
                </ul>
            </section>
            <Link className='class-list__link'to={`/admin`}>Go back</Link >
        </main>
        </div>
    </>
}
export default withRouter(ClassList)