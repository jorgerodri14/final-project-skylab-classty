import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'
import subject from '../../logic/subject'

function RemoveSubject({ history }) {
    const { subjects, setSubjects } = useContext(Context)
    const [update, setUpdate] = useState(false)

    function handleSubmit(event){
        event.stopPropagation()
        const {target:{ value: name } }= event
        debugger
        handleRemoveSubject(name)
    }
    async function handleRemoveSubject(name){
        try{
            await logic.subject.deleteSubject(name)
            setUpdate(!update)
        }catch(error){
            console.log(error.message)
        }
    }

    
    useEffect(() => {
        (async () => {
            
            const subjects = await logic.subject.retrieveSubjects();
            setSubjects(subjects)
debugger
        })()
    }, [update])
debugger
    return <>
        <Header />
        <main className='remove-subject'>
        <h2 className='remove-subject__h2'>Click to remove class</h2>
            <section>
                <form className='remove-subject__form' onChange={handleSubmit}> 
                    {subjects && subjects.length > 0 && subjects.map(({ name }) => {debugger
                            
                            return<div key={name+Math.random()} className='remove-subject__div'>
                            <label className='remove-subject__label'>{name}</label>
                            <input className='remove-subject__input' type="radio" name="nameClass" value={name}/>
                            </div>

                    })}

                 </form>
            </section>
            <Link className='remove-subject__link' to={`/admin`}>Go back</Link >
        </main>
    </>
}
export default withRouter(RemoveSubject)