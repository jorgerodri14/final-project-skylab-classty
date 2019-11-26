require('dotenv').config()

const { expect } = require('chai')
const addStudent = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST }} = process
describe('logic - add student', () => {
    before(() => database.connect(DB_URL_TEST))

    let nameS, surnameS, emailS, passwordS, typeS, nameT, surnameT, teachers, students, emailT, passwordT,idSub, idT, idS, nameSubject

    beforeEach(async () => {

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

        const subject = await Subject.create({name: nameSubject, students, teachers})
        idSub = subject.id
        
    })

    it('should succeed on correct data', async () => {
        const name = "Jorge"
        const surname = "Rodríguez Sánchez"
        const email = `jordi@domain.com`
        const password = `Spassword-${Math.random()}`
        const type = `student`
        await User.create({name, surname, email, password, type})

        await addStudent( name, surname, idSub)

        const _subject =  await Subject.findById(idSub)

        expect(_subject.students.length).to.equal(2)

    })

    it('should fail because subject dont exist', async () => {
        const idSub = '5d6fb48d1667a4291615288d'

        try {

            await addStudent(nameS, surnameS, idSub)

        } catch (error) {

            expect(error.message).to.exist
            expect(error.message).to.equal(`subject with id ${idSub} don´t exits`)

        }
    })

    it('should fail on unexisting user', async () => {
        const nameSub = '5d62f4d76fdb415d25a14496'

        try {

            await addStudent(nameSub, surnameS, idSub)

        } catch (error) {

            expect(error.message).to.equal(`student with name ${nameSub} don´t exists`)

        }
    }) 

    after(() => database.disconnect())
})