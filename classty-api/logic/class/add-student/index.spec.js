require('dotenv').config()

const { expect } = require('chai')
const addStudentToClass = require('.')
const { database, models: { User, Classroom } } = require('classty-data')

const { env: { DB_URL_TEST }} = process
describe('logic - add student to class', () => {
    before(() => database.connect(DB_URL_TEST))

    let nameS, surnameS, emailS, passwordS, typeS, nameT, surnameT, nameClass, teachers, students, emailT, passwordT,idClass, idT, idS, nameSubject

    beforeEach(async () => {
        nameClass = `Sname-${Math.random()}`
        nameS = `Sname-${Math.random()}`
        surnameS = `Ssurname-${Math.random()}`
        emailS = `Semail-${Math.random()}@domain.com`
        passwordS = `Spassword-${Math.random()}`
        typeS = `student`
        nameT = `Tname-${Math.random()}`
        surnameT = `Tsurname-${Math.random()}`
        emailT = `Temail-${Math.random()}@domain.com`
        passwordT = `Tpassword-${Math.random()}`
        typeT = `teacher`
        nameSubject = `subject-${Math.random()}`
       
        await User.deleteMany()

        const student = await User.create({name: nameS, surname: surnameS, email: emailS, password: passwordS, type: typeS})
        idS = student.id
        students = [ idS ]
        const teacher = await User.create({name: nameT, surname: surnameT, email: emailT, password: passwordT, type: typeT})
        idT = teacher.id
        teachers = [ idT ]

        const _class = await Classroom.create({name: nameClass, students, teachers})
        idClass = _class.id
        
    })

    it('should succeed on correct data', async () => {
        
        const name = "Jorge"
        const surname = "Rodríguez Sánchez"
        const email = `jordi@domain.com`
        const password = `Spassword-${Math.random()}`
        const type = `student`
        
        await User.create({name, surname, email, password, type})

        await addStudentToClass( name, surname, nameClass)

        const class_ =  await Classroom.findOne({name: nameClass})


        expect(class_.students.length).to.equal(2)

    })

    after(() => database.disconnect())
})