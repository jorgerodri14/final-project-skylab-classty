import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (idSub, title, date) {

    const token = logic.__userCredentials__

debugger
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/exams/${idSub}`, {
            method: 'POST',
            headers: {'content-type' : 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify({ title, date })
        })
        debugger
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

    })()
}