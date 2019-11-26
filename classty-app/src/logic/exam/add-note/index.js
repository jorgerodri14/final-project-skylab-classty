import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (name, surname, valor, idEx, idSub) {

    const token = logic.__userCredentials__

debugger
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/addNote/${idSub}/${idEx}`, {
            method: 'POST',
            headers: {'content-type' : 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify({ name, surname, valor })
        })
        debugger
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }

    })()
}