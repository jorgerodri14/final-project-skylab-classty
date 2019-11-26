require('dotenv').config()

const { expect } = require('chai')
const addTeacher = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST } } = process
describe('logic - add teacher', () => {
    before(() => database.connect(DB_URL_TEST))

    let nameS, surnameS, emailS, passwordS, typeS, nameT, surnameT, teachers, emailT, passwordT, idSub, idT, nameSubject, body, bodyStudent

    beforeEach(async () => {

        nameS = `Mentor-${Math.random()}`
        surnameS = `Ssurname-${Math.random()}`
        emailS = `Semail-${Math.random()}@domain.com`
        passwordS = `Spassword-${Math.random()}`
        typeS = `mentor`
        nameT = `Tname-${Math.random()}`
        surnameT = `Tsurname-${Math.random()}`
        emailT = `Temail-${Math.random()}@domain.com`
        passwordT = `Tpassword-${Math.random()}`
        typeT = `teacher`
        nameSubject = `subject-${Math.random()}`

        await User.deleteMany()

        const mentor = await User.create({ name: nameS, surname: surnameS, email: emailS, password: passwordS, type: typeS })
        idM = mentor.id
        const teacher = await User.create({ name: nameT, surname: surnameT, email: emailT, password: passwordT, type: typeT })
        idT = teacher.id
        teachers = [idT]
        const students = []

        const subject = await Subject.create({ name: nameSubject, students, teachers })
        idSub = subject.id

        body = {
            name: "Teacher",
            surname: "Rodríguez Sánchez",
            email:`jordi@domain.com`,
            password: `Spassword-${Math.random()}`,
            type: 'teacher'
        }
    
        await User.create(body)

        bodyStudent = {
            name: "Student",
            surname: "Rodríguez Sánchez",
            email:`jordi@domain.com`,
            password: `Spassword-${Math.random()}`,
            type: 'student'
        }
        await User.create(bodyStudent)
        
    })

    it('should succeed on correct data', async () => {
        await addTeacher(idM, body.name, body.surname, idSub)

        const _subject = await Subject.findById(idSub)
        
        expect(_subject.teachers.length).to.equal(2)
    })

    it('should fail on unexisting mentor', async () => {
        const _idM = '5d6fb48d1667a4291615288d'

        try {

            await addTeacher(_idM, body.name, body.surname, idSub)

        } catch (error) {

            expect(error.message).to.exist
            expect(error.message).to.equal(`mentor with id ${_idM} don´t exists`)

        }
    })

    it('should fail because id is not of mentor', async () => {
        const user = await User.findOne({name: bodyStudent.name, surname: bodyStudent.surname})

        try {

            await addTeacher(user.id, body.name, body.surname, idSub)

        } catch (error) {

            expect(error.message).to.exist
            expect(error.message).to.equal(`user with name ${user.name} isn't mentor`)

        }
    })

    it('should fail on unexisting teacher', async () => {
        const name = 'pacuco'

        try {

            await addTeacher(idM, name, body.surname, idSub)

        } catch (error) {

            expect(error.message).to.exist
            expect(error.message).to.equal(`teacher with name ${name} don´t exists`)

        }
    })

    it('should fail because id is not of teacher', async () => {
        const user = await User.findOne({name: bodyStudent.name, surname: bodyStudent.surname})

        try {

            await addTeacher(idM, user.name, user.surname, idSub)

        } catch (error) {

            expect(error.message).to.exist
            expect(error.message).to.equal(`user with name ${user.name} isn't teacher`)

        }
    })

    it('should fail because subject dont exist', async () => {
        const idSub = '5d6fb48d1667a4291615288d'

        try {

            await addTeacher(idM, body.name, body.surname, idSub)

        } catch (error) {

            expect(error.message).to.exist
            expect(error.message).to.equal(`subject with id ${idSub} don´t exits`)

        }
    })

    after(() => database.disconnect())
})