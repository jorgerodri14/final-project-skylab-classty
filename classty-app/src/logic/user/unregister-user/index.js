import logic from '../../'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (id) {

    const token = logic.__userCredentials__


    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: { 'content-type' : 'application/json', 'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}