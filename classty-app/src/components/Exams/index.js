import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Exams({ history }) {
    const {  user, setUser } = useContext(Context)
    const [update, setUpdate] = useState(false)
    const [students, setStudents] = useState(undefined)
    const [ exams, setExams ] = useState('')

    const _id = history.location.pathname.split('/').pop()

    function reverse(str) {
        return str.split("-").reverse().join("-");
    }
    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, date: { value: date } } } = event
        debugger
        handleCreateExam(title, reverse(date))
    }

    function handleNote(event) {
        event.preventDefault()
        debugger
        const { target: { select: { value: naSur }, note: { value: note }, id: { value: idE } } } = event
        debugger
        const arr = naSur.split(" ")
        debugger
        handleAddNote(arr[0], arr[1], note, idE)
    }

    async function handleAddNote(name, surname, note, idE) {
        debugger
        await logic.exam.addNote(name, surname, note, idE, _id)
        document.getElementById('ex').value = ''
        setUpdate(!update)
    }

    async function handleCreateExam(title, date) {
        debugger
        await logic.exam.createExam(_id, title, date)
        document.getElementById('ex').value = ''
        setUpdate(!update)
    }
    useEffect(() => {
        (async () => {
            const user = await logic.user.retrieveUser()
            setUser(user)
            if (user && user.type == 'student') {
                debugger
                const exams = await logic.exam.retrieveAllExams(_id);
                setExams(exams)
            } else if(user && user.type == 'teacher'){
                debugger
                const exams = await logic.exam.retrieveAllExamsTeacher(_id);
                setExams(exams)
                debugger
                const students = await logic.exam.retrieveNotUserNoteExam(_id);
                debugger
                setStudents(students)
            }

        })()
    }, [update])

    return <>
        <Header />
        <main className='exam'>
            <section className='exam__section'>
                {user && user.type == 'student' && <>
                <h3 className='exam__h4'>Exams</h3>
                
                <ul className='exam__ul--pos'>
                    {exams && exams.length > 0 && exams.map(({ _exam }) =>

                        _exam.title&&<li key={_exam.title} className='exam__li'>
                            <h4 className='exam__h4--padding'>{_exam.title}</h4>
                            {_exam.date&&_exam.date!==undefined&&<time className='exam__time--position'>{reverse(_exam.date.slice(0, 9))}</time>}
                            {_exam.notes && <h3 className='exam__h3'>{_exam.notes[0].note}</h3>}
                        </li>
                    )}

                </ul> </>}
                {user && user.type == 'teacher' && <>
                <h3 className='exam__h4'>Create exam</h3>
                    <form className='exam__form' onSubmit={handleSubmit}>
                        <input className='exam__input' type='text' id='ex' name='title' placeholder='title' />
                        <input className='exam__input' type='date' id='ex' name='date' placeholder='date' />
                        <button className='exam__button'>Create</button>
                    </form>
                </>}
                {user && user.type == 'teacher' &&
                    <ul className='exam__ul--size'>
                        {exams && exams.length > 0 && exams.map((_exam) =>
                            <li key={_exam.title}>
                                <div className='exam__div'>
                                <h4 className='exam__h4--size'>{_exam.title}</h4>
                                {_exam.date&&_exam.date!==undefined&&<time className='exam__time--position'>{reverse(_exam.date.slice(0, 9))}</time>}
                                </div>
                                <form className='exam__form' onSubmit={handleNote}>
                                    <select className='exam__select' name="select">
                                        {students && students.length > 0 && students.map(student =>{debugger

                                            return student.id == _exam._id&&

                                            student.user && student.user.length > 0 && student.user.map(({name, surname, id})=>
                                            
                                                <option key={id} value={name+" "+surname}>{name + " " + surname}</option>
    
                                            )
                                        })}
                                    </select>
                                    <input className='exam__input' type='text' id='ex' name="note" placeholder='note' />
                                    <input type='hidden' name='id' value={_exam._id} />
                                    <button className='exam__button--size'>Add</button>
                                </form>
                                <h5 className='exam__h5'>Notes</h5>
                                <ul className='exam__ul'>{_exam.notes && _exam.notes.length > 0 && _exam.notes.map(({ name, surname, note }) => {
                                    return <li key={surname+name}>
                                        <h5>{name + " " + surname}</h5>
                                        <p>{note}</p>
                                    </li>
                                })}</ul>
                            </li>)}
                    </ul>}
            </section>
        </main>
    </>
}
export default withRouter(Exams)