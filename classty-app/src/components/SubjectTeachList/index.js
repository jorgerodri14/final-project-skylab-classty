import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function SubjectTeacherList() {
    const { teachers, setTeachers, user } = useContext(Context)

    
    useEffect(() => {
        (async () => {
            debugger
            const teachers = await logic.subject.retrieveTeachersSubjects();
            setTeachers(teachers)
            
        })()
    }, [])
    
    return <>
        <Header />
        <main className='stl'>

            <section>
                <ul className='stl__ul'>
                    {teachers && teachers.length > 0 && teachers.map(teacher => {debugger
                        return<div key={teacher.title}>
                       {teacher.title && <li key={teacher.title} className='stl__li'>
                           {teacher.title && <h3 className='stl__h3'>{teacher.title}</h3>}
                            {teacher.teachers.map(t => <Link key={t.id} className='stl__link' to={`/profile/${t.id}`} >{t.name + " " + t.surname}</Link>
)}
                        </li>}
                        </div>
                    }
                    )}

                </ul>
            </section>
        </main>
    </>
}
export default withRouter(SubjectTeacherList)