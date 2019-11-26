import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (idSub, name, surname) {

    const token = logic.__userCredentials__
  debugger
    return (async () => {debugger
        const response = await fetch(`${REACT_APP_API_URL}/addSubStudent/${idSub}`, {
            method: 'POST',
            headers: {'content-type' : 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify({ name, surname })
        })
        debugger
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}