import React, { useEffect, useContext } from 'react'
import logic from '../../logic'
import Context from '../Context'
import { withRouter, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from '../Header';

function Mentor({ history }) {
    const { error, setError } = useContext(Context)
    const handleGoToSubjectList = event => {
        event.preventDefault()
        setError(undefined)

        history.push('/subject-list')
    }
    const handleGoToClassList = event => {
        event.preventDefault()
        setError(undefined)

        history.push("/class-list")
    }

    const handleGoToRemoveClass = event => {
        event.preventDefault()
        setError(undefined)

        history.push("/remove-class")
    }

    const handleGoToTeacherList = event => {
        event.preventDefault()
        setError(undefined)

        history.push('/teacher-list')
    }

    const handleGoToRemoveTeacher = event => {
        event.preventDefault()
        setError(undefined)

        history.push('/remove-teacher')
    }

    const handleGoToRemoveSubject = event => {
        event.preventDefault()
        setError(undefined)

        history.push('/remove-subject')
    }
    return <>
        <Header />
        <nav className='mentor'>
            <ul className='mentor__ul'>
                <h3 className='mentor__h3'>Class Operative</h3>
                <li className='mentor__li'><a className='mentor__a' href='' onClick={handleGoToClassList}>Class list</a></li>
                <li className='mentor__li'><a className='mentor__a' href='' onClick={handleGoToRemoveClass}>Remove Class</a></li>
            </ul>
            <ul className='mentor__ul'>
                <h3 className='mentor__h3'>Teacher Operative</h3>
                <li className='mentor__li'><a className='mentor__a' href='' onClick={handleGoToTeacherList}>Teacher list</a></li>
{/*                 <li className='mentor__li'><a className='mentor__a' href='' onClick={handleGoToRemoveTeacher}>Remove teacher</a></li>
 */}            </ul>
            <ul className='mentor__ul--margin'>
                <h3 className='mentor__h3'>Subject Operative</h3>
                <li className='mentor__li'><a className='mentor__a'href='' onClick={handleGoToSubjectList}>Subject list</a></li>
{/*                  <li className='mentor__li'><a className='mentor__a'href='' onClick={handleGoToRemoveSubject}>Remove subject</a></li>
 */}             </ul>
        </nav>

    </>
}
export default withRouter(Mentor)