import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (image) {
    // validate fields
    const token = logic.__userCredentials__
    var formData = new FormData();
    formData.append('image', image);
    //headers: { 'content-type': 'multipart/form-data', authorization: `bearer ${token}` },
    return (async () => {
        // if(image !== undefined)
        const response = await fetch(`${REACT_APP_API_URL}/upload`, {
            method: 'post',
            headers: { authorization: `bearer ${token}` },
            body: formData
        })
        debugger
        if (response.status === 200) {
            const { message } = await response.json()
        
        
        } else {
            const { error } = await response.json()
            throw new Error(error)
        }
    })()
}