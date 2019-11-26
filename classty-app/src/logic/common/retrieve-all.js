import logic from '../'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (type) {
debugger
    const token = logic.__userCredentials__

    return (async () => {
        debugger
        const response = await fetch(`${REACT_APP_API_URL}/users-all/${type}`, {
            method: 'GET',
            headers: {  'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            debugger
            const {_user} = await response.json()
            let teachers = [] 
            _user.forEach(teacher => {
                let name = teacher.name
                let surname = teacher.surname
                let id = teacher.id
                teachers.push({name, surname, id})})
            return teachers
        }
            
    })()
}