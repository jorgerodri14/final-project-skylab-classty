import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'
/* import './Header.sass'
 */function Header({ history }) {

    const { setView, user,setUser } = useContext(Context)
    function handleLogaut(event) {
        event.preventDefault()

       logic.user.logUserOut()

        setView(undefined)
        setUser(undefined)

        history.push('/login')

    }

    function handleProfile(event) {
        event.preventDefault()


        setView(undefined)
        setUser(undefined)

        history.push('/profile/1')

    }
    
    useEffect(() => {
        (async () => {
            const user = await logic.user.retrieveUser()
            setUser(user)
        })()
    }, [])
    return <>
        <header className="header">
            <h1 className='header__h1'>classty</h1>
            <div className='q'>
            {user&&<p className='header__h3'>{user.name}</p>}
            {user&&<p className='header__h3'>{user.surname}</p>}
            </div>
            <nav className="header__nav">
                <ul className="header__ul">
                    <li className='header__li'><button className='header__button' onClick={handleProfile}><img src="../img/profile.png" alt="P"></img></button></li>
                    <li className='header__li'><button className='header_button--red' onClick={handleLogaut}><img src="../img/logout.png" alt="P"></img></button></li>
                </ul>
            </nav>
        </header>
    </>
}
export default withRouter(Header)