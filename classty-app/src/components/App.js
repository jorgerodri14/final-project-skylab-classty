import React, { useState, useEffect } from 'react'
import Context from './Context'
import logic from '../logic'
import Login from './Login'
import ClassList from './ClassList'
import Register from './Register'
import Mentor from './Mentor'
import Subject from './Subject'
import Exams from './Exams'
import Homeworks from './Homework'
import SubjectList from './SubjectList'
import RemoveClass from './RemoveClass'
import RemoveTeacher from './RemoveTeacher'
import RemoveSubject from './RemoveSubject'
import TeacherList from './TeacherList'
import StudentList from './StudentList'
import SubjectTeacherList from './SubjectTeachList'
import StudentHome from './StudentHome'
import TeacherHome from './TeacherHome'
import Profile from './Profile'
import { withRouter, Route, Redirect } from 'react-router-dom'

import './App.sass';

function App({ history }) {
  
  const [view, setView] = useState('')

  const [user, setUser] = useState(undefined)

  const [subjects, setSubjects] = useState(undefined)

  const [classes, setClasses] = useState(undefined)

  const [teachers, setTeachers] = useState(undefined)

  const [students, setStudents] = useState(undefined)

   const [posts, setPosts] = useState(undefined)
   
  const [exams, setExams] = useState(undefined)

  const [error, setError] = useState(undefined)

    

  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  }, [history.location])

  return (

    <div className='app'>
      <Context.Provider value={{error, setError, posts, setPosts, exams, setExams , students, setStudents, classes, setClasses, view, setView, user, setUser, subjects, setSubjects, teachers, setTeachers }} >

{/*         <header className='home' >
          {view !== 'home' && !logic.user.isUserLoggedIn() && <nav>
            <ul className='home__ul'>
              {view !== 'login' && <Redirect to='/login'/>}
              {view !== 'register' && <Redirect to='/register'/>}
            </ul>
          </nav>
          }
        </header> */}
        {!logic.user.isUserLoggedIn() && <Redirect to='/login' />}
        {logic.user.isStudent() && <Redirect to="/student-home" />}
        {logic.user.isMentor() && <Redirect to="/admin" />}
        {logic.user.isTeacher() && <Redirect to="/teacher-home" />}


        <Route exact path="/login" render={() => !logic.user.isUserLoggedIn()  ? <Login /> : null} />
        <Route exact path="/register" render={() => !logic.user.isUserLoggedIn() ? <Register /> : null} />

        <Route path="/student-home" render={() => logic.user.isUserLoggedIn()  ? <StudentHome /> : history.push('/')} />
        <Route path="/admin" render={() => logic.user.isUserLoggedIn() ? <Mentor /> : history.push('/')} />
        <Route path="/class-list" render={() => logic.user.isUserLoggedIn() ? <ClassList /> : history.push('/')} />
        <Route path="/remove-class" render={() => logic.user.isUserLoggedIn() ? <RemoveClass /> : history.push('/')} />
        <Route path="/teacher-list" render={() => logic.user.isUserLoggedIn() ? <TeacherList /> : history.push('/')} />
        <Route path="/remove-teacher" render={() => logic.user.isUserLoggedIn() ? <RemoveTeacher /> : history.push('/')} />
        <Route path='/teacher-list-subject' render={() => logic.user.isUserLoggedIn() ? <SubjectTeacherList /> : history.push('/')} />
        <Route path='/student-list' render={() => logic.user.isUserLoggedIn() ? <StudentList /> : history.push('/')} />
        <Route exact path='/subject/:id' render={() => logic.user.isUserLoggedIn() ? <Subject  /> : history.push('/')} />
        <Route path='/subject/exams/:id' render={() => logic.user.isUserLoggedIn() ? <Exams /> : history.push('/')} />
        <Route path='/subject/homeworks/:id' render={() => logic.user.isUserLoggedIn() ? <Homeworks /> : history.push('/')} />
        <Route path='/teacher-home' render={() => logic.user.isUserLoggedIn() ? <TeacherHome  /> : history.push('/')} />
        <Route path='/profile/:id' render={() => logic.user.isUserLoggedIn() ? <Profile /> : history.push('/')} />
        <Route path='/subject-list' render={() => logic.user.isUserLoggedIn() ? <SubjectList /> : history.push('/')} />
        <Route path='/remove-subject' render={() => logic.user.isUserLoggedIn() ? <RemoveSubject /> : history.push('/')} />


      </Context.Provider>
    </div>
  );
}

export default withRouter(App);
