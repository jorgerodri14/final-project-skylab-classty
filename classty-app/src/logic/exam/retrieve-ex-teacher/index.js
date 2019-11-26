import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (idSub) {

    const token = logic.__userCredentials__

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/exam/${idSub}`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            const a = await response.json()
            const result = a.result
            return result
        }
    })()
}