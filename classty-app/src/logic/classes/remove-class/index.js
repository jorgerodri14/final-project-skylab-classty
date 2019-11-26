import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (nameClass) {
debugger
    const token = logic.__userCredentials__


    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/class`, {
            method: 'DELETE',
            headers: { 'content-type' : 'application/json', 'authorization': `bearer ${token}` },
            body: JSON.stringify({nameClass})
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}