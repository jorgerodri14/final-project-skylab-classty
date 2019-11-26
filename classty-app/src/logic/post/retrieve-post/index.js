import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (id) {

    const token = logic.__userCredentials__
debugger
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/post/${id}`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            debugger
            const post = await response.json()
            debugger
            return post.result
        }
    })()
}