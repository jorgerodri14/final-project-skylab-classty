import logic from '../..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (idSub) {

    const token = logic.__userCredentials__
    let exam = []
    debugger
    return (async () => {

        //RETURN EXAMS FOR SUBJECT
        const exams = await fetch(`${REACT_APP_API_URL}/exam/${idSub}`, {
            method: 'GET',
            headers: { 'authorization': `bearer ${token}` }
        })

        if (exams.status !== 201) {
            const { error } = await exams.json()
            throw Error(error)
        }
        else {
            const a = await exams.json()
            exam = a.result
        }
        debugger
        //RETURN ALL STUDENTS THAT ITS IN SUBJECT
        const students = await fetch(`${REACT_APP_API_URL}/subjects/${idSub}`, {
            method: 'GET',
            headers: { 'authorization': `bearer ${token}` }
        })

        if (students.status !== 201) {
            const { error } = await students.json()
            throw Error(error)
        }
        else {
            debugger
            const { result } = await students.json()
            debugger

            return exam.map(_exam => {debugger
                const student = []
                result.forEach(res => {debugger
                    let _users = _exam.notes.find(note => note.student == res.id)
                    debugger
                    if(!_users)
                    student.push({ name: res.name, surname: res.surname, id: res.id })
                debugger
                    })
                
                return { title: _exam.title, id: _exam._id, user: student }
            })
        }
    })()
}