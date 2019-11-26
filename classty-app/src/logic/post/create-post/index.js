import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (idSub, value, name, surname, user) {

    const token = logic.__userCredentials__
    const message ={
        body: value
    }
    const _body = {
        user: user,
        name: name,
        surname: surname,
        message: message
    }
debugger
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/post/${idSub}`, {
            method: 'POST',
            headers: {'content-type' : 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify({ _body })
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            
            const post = await response.json()
            
            return post.result
        }
    })()
}