require('dotenv').config()

const { expect } = require('chai')
const unregisterSubject = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST }} = process
describe('logic - unregister subject', () => {
    before(() => database.connect(DB_URL_TEST))

    let nameS, surnameS, emailS, passwordS, typeS, nameT, surnameT, teachers, students, emailT, passwordT, idT, idS, nameSubject

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

        await Subject.create({name: nameSubject, students, teachers})
        
    })

    it('should succeed on correct data', async () => {
        
        await unregisterSubject(nameSubject)

        const subject =  await Subject.findOne({name:nameSubject})

        expect(subject).not.to.exist

    })

    it('should fail on unexisting user', async () => {
        const nameSub = '5d62f4d76fdb415d25a14496'

        try {

            await unregisterSubject(nameSub)

        } catch (error) {

            expect(error.message).to.equal(`wrong credentials`)

        }
    })

    after(() => database.disconnect())
})