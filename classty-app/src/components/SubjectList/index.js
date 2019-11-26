import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function SubjectList({ history }) {
    const { user, setUser } = useContext(Context)
    const [subjects, setSubjects] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const [students, setStudents] = useState(undefined)
    const [teachers, setTeachers] = useState(undefined)
  
    function handleSubmit(event) {
        event.preventDefault()
        debugger
        const { target: { idSub: { value: id }, student: {value: opt} , select: { value: naSur } } } = event
        debugger
        const arr = naSur.split(" ")
        debugger
        if (opt=='1'){ 
            handleAddStudent(id, arr[0], arr[1])
        }else{ 
            handleAddTeacher(id, arr[0], arr[1])
        }
    }

    async function handleAddStudent(name, surname, idSub) {

        try {
            debugger
            await logic.subject.addStudent(name, surname, idSub)
            debugger
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }

    async function handleAddTeacher(name, surname, idSub) {

        try {
            debugger
            await logic.subject.addTeacher(name, surname, idSub)
            debugger
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }
    useEffect(() => {
        (async () => {
            debugger
            const users = await logic.subject.retrieveTeacherNotInscrit()
            debugger
            setUser(users)

        })()
    }, [update])

    return <>
        <Header />
        <main className='subject-list'>

            <section className='subject-list__section'>

                <h2 className='subject-list__h2'>Add user to subject</h2>

                <ul className='subject-list__ul'>

                    {user && user.length > 0 && user.map(({ title, id, teacher, student }) =>



                        <li key={id} className='subject-list__li'>
                            <h3 className='subject-list__h3'>{title}</h3>

                            {
                                <form className='subject-list__form' onSubmit={handleSubmit}>
                                    <select className='subject-list__select' name="select">
                                        {student && student.length > 0 && student.map(({ name, surname }) =>

                                            <option key={surname+name} className='subject-list__option'  value={name + " " + surname}>{name + " " + surname}</option>

                                        )}

                                    </select>
                                    <input type='hidden' name='idSub' value={id} />
                                    <input type='hidden' name='student' value='1' />
                                    <button className='subject-list__button'>Add</button>
                                </form>

                            }
                            {
                                <form className='subject-list__form' onSubmit={handleSubmit}>
                                    <select className='subject-list__select' name="select">
                                    
                                        {teacher && teacher.length > 0 && teacher.map(({ name, surname }) =>

                                            <option key={surname+name} value={name + " " + surname}>{name + " " + surname}</option>

                                        )
                                        
                                        }

                                    </select>
                                    <input type='hidden' name='idSub' value={id} />
                                    <input type='hidden' name='student' value='0' />

                                    <button className='subject-list__button'>Add</button>
                                </form>

                            }
                         
                        </li>



                    )}
                </ul>


            </section>
            <Link className='subject-list__link' to={`/admin`}>Go back</Link >
        </main>
    </>
}
export default withRouter(SubjectList)