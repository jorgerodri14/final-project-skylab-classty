import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Profile({ history }) {

    const [profile, setProfile] = useState('')

    const [up, setUp] = useState(false)

    const [control, setControl] = useState(false)

    const [update, setUpdate] = useState(false)


    /*     function handleSubmit(event){
            event.preventDefault()
            const {target:{ name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event
            handleRegister(name, surname, email, password)
        } */

    function handleSubmit(event) {
        event.preventDefault()

        const { target: { image: { files: [image] } } } = event
        onPublish(image)

    }
    async function onPublish(image) {
        try {
            await logic.uploadPhoto(image)
            setUpdate(!update)
        } catch (error) {
            console.log(error.message)
        }
    }

    function handleEdit(event) {
        event.preventDefault()
        setControl(!control)
    }

    useEffect(() => {
        (async () => {
            debugger
            const _id = history.location.pathname.split('/').pop()

            if (_id == '1') {
                const user = await logic.user.retrieveUser()
                setProfile(user)
                setUp(true)
            } else if (_id.length==24) {
                const user = await logic.user.retrieveOther(_id);
                setProfile(user)
            }

        })()
    }, [update])

    return <>
        <Header />
        <main className='profile'>
            <h2 className='profile__h2'>Profile</h2>
            <div className='profile__div'>
                <img className='profile__img'src={profile.image} />
                <h3 className='profile__h3'>{profile.name}</h3>
                <h3 className='profile__h3'>{profile.surname}</h3>
                <h3 className='profile__h3'>{profile.email}</h3>
            </div>
        </main>
        {up && <a className='profile__a' href="" onClick={handleEdit}>Edit profile</a>}
        {control &&
            <section className='profile__section'>
                <h4 className='profile__h4'>Add Photo</h4>
                <form className='profile__form--photo' onSubmit={handleSubmit} method="post" enctype="multipart/form-data" >
                    <label htmlFor=""></label>
                    <input className='profile__form--input' type="file" name="image" id="" />
                    <button className='profile__for--button'>Add Photo</button>
                </form>
            </section>
        }
    </>
}
export default withRouter(Profile)