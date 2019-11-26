import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'
import Feedback from '../Feedback'

function Register({ history }) {

    const { error, setError, setView } = useContext(Context)

    const handleGoToLogin = event => {
        event.preventDefault()

        setView('login')
        setError(undefined)
        history.push('/login')
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
        handleRegister(name, surname, email, password)
    }

    async function handleRegister(name, surname, email, password) {

        try {

            await logic.user.registerUser(name, surname, email, password)
            setError(undefined)
            history.push('/login')
        } catch ({message}) {
debugger
            setError(message)
        }
    }

    return <div className='register__body'>
        <img className='register__body-img' src="../img/logo.png" />
        <section className='register'>
            <h2 className='register__h2'>Register</h2>
            <form className='register__form' onSubmit={handleSubmit}>
                <input className='register__input' type="name" name="name" placeholder='name' />
                <input className='register__input' type="surname" name="surname" placeholder='surname'/>
                <input className='register__input' type="email" name="email" placeholder='email'/>
                <input className='register__input' type="password" name="password" placeholder='password'/>
                <button className='register__button'>Submit</button>
            </form>
            <a className='register__a' href="" onClick={handleGoToLogin}>Go to login</a>
        </section>
        {error&&<Feedback error={error}/>}
    </div>
}
export default withRouter(Register)