import logic from '../..'
import subject from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function () {

    const token = logic.__userCredentials__

    let sub = []

    let tech = []

    let stu = []

    return (async () => {
        debugger
        const subjects = await fetch(`${REACT_APP_API_URL}/subjects`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (subjects.status !== 201) {
            const { error } = await subjects.json()
            throw Error(error)
        }
        else {
            const a = await subjects.json()
            debugger
            sub = a.result
            debugger
        }
        const teachers = await fetch(`${REACT_APP_API_URL}/users-all/teacher`, {
            method: 'GET',
            headers: {  'authorization': `bearer ${token}` }
        })
        
        if (teachers.status !== 200) {
            const { error } = await teachers.json()
            throw Error(error)
        }
        else {
            debugger
            const a = await teachers.json()
            debugger
            tech = a._user
          debugger

        }
        const students = await fetch(`${REACT_APP_API_URL}/users-all/student`, {
            method: 'GET',
            headers: {  'authorization': `bearer ${token}` }
        })
        
        if (students.status !== 200) {
            const { error } = await students.json()
            throw Error(error)
        }
        else {
            debugger
            const a = await students.json()
            debugger
            stu = a._user
          debugger

        }
        return sub.map(s => {
            const teacher = []
            const student = []
            tech.forEach(res => {
                let _users = s.teachers.find(teacher => teacher.toString() == res.id)
                
                if(!_users)
                teacher.push({ name: res.name, surname: res.surname, id: res.id })
            
                })
                stu.forEach(res => {
                    let _users = s.students.find(student => student.toString() == res.id)
                    
                    if(!_users)
                    student.push({ name: res.name, surname: res.surname, id: res.id })
                
                    })
            
            return { title: s.name, id: s._id, teacher, student }
        })
    })()
}