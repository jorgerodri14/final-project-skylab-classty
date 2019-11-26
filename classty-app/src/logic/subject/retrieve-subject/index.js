import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function () {
debugger
    const token = logic.__userCredentials__


    return (async () => {
        debugger
        const response = await fetch(`${REACT_APP_API_URL}/subjectTe`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
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