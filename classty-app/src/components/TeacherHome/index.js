import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function TeacherHome({ history }) {
    debugger
     const { error, setError ,posts, setPosts } = useContext(Context)
     const [update, setUpdate] = useState(false)
    let interval
    debugger
   

    function handleSubmit(event) {
        debugger
        event.preventDefault()
        const { target } = event
        const value = target[0].value
        debugger
        handlePublish(value)
    }
function handleGoToTeacher(event){
    event.preventDefault()
    history.push()
}
    async function retrieveSubId() {
        const user = await logic.user.retrieveUser()
        debugger
        const subject = await logic.subject.retrieveTeacherHome(user.id);
        return subject._id
    }
    const handleGoToExam=async(event) => {
        event.preventDefault()
        const sub = await retrieveSubId()
        debugger
        history.push(`/subject/exams/${sub}`)
    }

    async function handleGoToHomework(event) {
        event.preventDefault()
        const sub = await retrieveSubId()
        debugger
        history.push(`/subject/homeworks/${sub}`)
    }

    async function handlePublish(value) {

        try {
            debugger
            const user = await logic.user.retrieveUser()
            debugger
            const subject = await logic.subject.retrieveTeacherHome(user.id);
            debugger
            await logic.post.createPost(subject._id, value, user.name, user.surname, user.id)
            debugger

            document.getElementById('area').value = ""
            const posts = await logic.post.retrievePost(subject._id)
            setPosts(posts)
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }

    useEffect(() => {
       autoUpdate()
        
        async function autoUpdate() {
            debugger
            const user = await logic.user.retrieveUser()
            debugger
            const _subject = await logic.subject.retrieveTeacherHome(user.id);
        
            debugger
            if(_subject){
            const posts = await logic.post.retrievePost(_subject._id);
            setPosts(posts)}else{
                logic.user.logUserOut()
                history.push('/login')

            }
        }
             interval = setInterval(function(){
                autoUpdate()
            }, 1000)
            return () => clearInterval(interval) 

    }, [update])
 
    debugger
    return <>
        <Header />
        <main className='teacher-home'>
            <nav>
                <ul className='teacher-home__ul'>
                    <li><a className='teacher-home__a' href='' onClick={handleGoToHomework}>Homeworks</a ></li>
                    <li><a className='teacher-home__a' href='' onClick={handleGoToExam}>Exams</a ></li>
                </ul>
            </nav>
           
            <section>
                <ul className='teacher-home__ul--many'>
                    {posts && posts.length > 0 && posts.map(post =>
                        <li className='teacher-home__li' key={post._id}>
                            <h3 className='teacher-home__h3'>{post.name+" "+post.surname} </h3>
                            <p className='teacher-home__p' key={post.message.id}>{post.message.body}</p>

                        </li>
                    )}

                </ul>
            </section>
            <section>
                <form className='teacher-home__form' onSubmit={handleSubmit}>
                    <textarea name="postid" id="area" cols="40" rows="4" placeholder="That you thinking..."></textarea>
                    <button className='teacher-home__button'><img src='../img/paper-plane (2).png'></img></button>
                </form>
            </section>
        </main>
    </>
}
export default withRouter(TeacherHome)