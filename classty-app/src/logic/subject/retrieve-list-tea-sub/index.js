import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function () {
debugger
    const token = logic.__userCredentials__


    return (async () => {
        debugger
        const response = await fetch(`${REACT_APP_API_URL}/subjectT`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        debugger
        if (response.status !== 201) {debugger
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            const a = await response.json()
            debugger
            const result = a.result
            debugger
            return result
        }
            
    })()
}