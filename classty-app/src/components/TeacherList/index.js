import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Feedback from '../Feedback'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function TeacherList({ history }) {
    const { teachers, setTeachers, error, setError } = useContext(Context)
    const [ update, setUpdate ] = useState(false)
    function handleSubmit(event){
        event.preventDefault()
        const {target:{ name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        handleRegister(name, surname, email, password)
    }
    
    async function handleRegister(name, surname, email, password){

        try{
            debugger
            await logic.user.registerUser(name, surname, email, password, 'teacher')
            console.log('register with success')
            document.getElementById('clear').value=""
            document.getElementById('clear1').value=""
            document.getElementById('clear2').value=""
            document.getElementById('clear3').value=""
            setUpdate(!update)
        }catch({message}){
            
            setError(message)
        }
    }
    function handleBack(event) {
        event.preventDefault()
        history.go(-1)
    }

    debugger
    useEffect(() => {
        (async () => {
            debugger
            const teachers = await logic.retrieveAll('teacher');
            setTeachers(teachers)

        })()
    }, [update])

    return <>
        <Header />
        <main className='teacher-list'>
            <section className='teacher-list__section'>
                <h2 className='teacher-list__h2--margin'>Create teacher</h2>
                <form className='teacher-list__form' onSubmit={handleSubmit}>
                    <input className='teacher-list__input' id="clear" type="name" name="name" placeholder='name' />
                    <input className='teacher-list__input' id="clear1" type="surname" name="surname" placeholder='surname'/>
                    <input className='teacher-list__input' id="clear2" type="email" name="email" placeholder='email'/>
                    <input className='teacher-list__input' id="clear3" type="password" name="password" placeholder='password'/>
                    <button className='teacher-list__button'>Submit</button>
                </form>
                {error&&<Feedback error={error}/>}
                </section>
                <section className='teacher-list__section'>
                <h2 className='teacher-list__h2'>Teachers</h2>
                <ul className='teacher-list__ul'>
                    {teachers && teachers.length > 0 && teachers.map(({ name, surname }) =>

                        <li key={surname+name} className='teacher-list__li'>{name + " " + surname}</li>
                    )}

                </ul>
            </section>
            <a className='teacher-list__a' href='' onClick={handleBack}>Go back</a>
        </main>
    </>
}
export default withRouter(TeacherList)