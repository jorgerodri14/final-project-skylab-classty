import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function StudentHome({ history }) {
    const { subjects, setSubjects, user } = useContext(Context)

    const handleGoToTeacherList = event => {
        event.preventDefault()
        history.push('/teacher-list-subject')
    }

    const handleGoToStudentList = event => {
        event.preventDefault()
        history.push('/student-list')    
    }
debugger
    useEffect(() => {
        (async () => {
debugger        
                const subjects = await logic.subject.listSubjects();
                setSubjects(subjects)

        })()
    },[user])

    return <>
        <Header />
        <main className='student-home'>
            <nav className='student-home__nav'>
                <ul className='student-home__ul'>
                <li><a className='student-home__a' href='' onClick ={handleGoToTeacherList}>Teachers</a></li>
                <li><a className='student-home__a' href='' onClick ={handleGoToStudentList}>Students</a></li>
                </ul>
            </nav>
            <section className='student-home__section'>
                <div className='student-home__div'>
                {subjects && subjects.length>0 && subjects.map(({ id, title }) =>
                    <ul key={id} className='student-home__ul--size'>

                        <li key={id} className='student-home__li'><Link className='student-home__link' to={`/subject/${id}`}>{title}</Link ></li>

                    </ul>)}
                </div>
            </section>
        </main>
    </>
}
export default withRouter(StudentHome)