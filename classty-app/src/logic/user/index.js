import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import registerUser from './register-user'
import isUserLoggedIn from './is-user-logged-in'
import isStudent from './is-student'
import isTeacher from './is-teacher'
import isMentor from './is-mentor/is-mentor'
import logUserOut from './log-user-out'
import retrieveOther from './retrieve-other'
import unregisterUser from './unregister-user'


export default {
    
    authenticateUser,
    retrieveUser,
    registerUser,
    isUserLoggedIn,
    isStudent,
    isTeacher,
    isMentor,
    logUserOut,
    retrieveOther,
    unregisterUser
}