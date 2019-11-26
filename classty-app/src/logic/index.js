import retrieveAll from './common/retrieve-all'
import uploadPhoto from './upload-photo'
import classes from './classes'
import exam from './exam'
import homework from './homework'
import post from './post'
import subject from './subject'
import user from './user'

export default {
    set __userCredentials__(token) {

        sessionStorage.token = token

    },
    get __userCredentials__() {

        return sessionStorage.token
    },
    set __userType__(type) {
        
        sessionStorage.type = type
    },
    get __userType__(){
        
        return sessionStorage.type
    },
    retrieveAll,
    uploadPhoto,
    classes,
    exam,
    homework,
    post,
    subject,
    user
}

