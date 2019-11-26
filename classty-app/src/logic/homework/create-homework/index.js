import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(idSub, title, comment, expiry) {

    const token = logic.__userCredentials__


    return (async () => {
       const response = await fetch(`${REACT_APP_API_URL}/homeworks/${idSub}`, {
            method: 'POST',
            headers: { 'content-type' : 'application/json', 'authorization': `bearer ${token}` },
            body: JSON.stringify({ title, comment, expiry })
        })

        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}