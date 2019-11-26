import React, { useContext } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import { withRouter, Link } from 'react-router-dom'
import Context from '../Context'

function Login({ history }) {

    const { user, setUser, view, setView, error, setError } = useContext(Context)

    const handleGoToRegister = event => {
        event.preventDefault()
    
        setView('register')
        setError(undefined)
        history.push('/register')
      }

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {

            const token = await logic.user.authenticateUser(email, password)

            logic.__userCredentials__ = token

            const user = await logic.user.retrieveUser(token)

            logic.__userType__ = user.type
            setUser(user)

            setView('home')

            user && (user.type == 'mentor') && history.push('/admin')

            user && (user.type == 'student') && history.push('/student-home')

            user && (user.type == 'teacher') && history.push('/teacher-home')

        } catch ({message}) {debugger
            setError(message)
        }
    }
    // {
    // view == 'home' &&
    //     user && (user.type == 'mentor') && history.push('/admin')

    //     user && (user.type == 'student') && history.push('/student-home')

    //     user && (user.type == 'teacher') && history.push('/')
    // }
    return <div className='body'>
        <img className='body__img' src="../img/logo.png"/>
        <section className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <input className='login__input' type="email" name="email" placeholder='email' />
                <input className='login__input' type="password" name="password" placeholder='password'/>
                <button className='login__button'>Submit</button>
            </form>
        <a className='login__a' href="" onClick={handleGoToRegister}>Go to register</a>
        </section>
           {error&&<Feedback error={error}/>}
    </div>
}
export default withRouter(Login)