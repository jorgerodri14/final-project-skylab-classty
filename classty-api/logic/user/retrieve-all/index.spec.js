require('dotenv').config()

const { expect } = require('chai')
const retrieveAll = require('.')
const { database, models: { User } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all', () => {
    before(() => database.connect(DB_URL_TEST))

    let student1, id1, student2, id2, teacher1, id3, teacher2, id4

    beforeEach(async () => {
        student1 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        student2 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        teacher1 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }
        teacher2 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }

        await User.deleteMany()
        
        const userS1 = await User.create(student1)
        id1 = userS1.id
        const userS2 = await User.create(student2)
        id2 = userS2.id
        const userT1 = await User.create(teacher1)
        id3 = userT1.id
        const userT2 = await User.create(teacher2)
        id4 = userT2.id
    })

    it('should succeed on correct data of student', async () => {
        const _type = 'student'
        
        const users = await retrieveAll(_type)

        expect(users).to.exist
        expect(users[0].id).to.equal(id1)
        expect(users[1].id).to.equal(id2)

    })

    it('should succeed on correct data of student', async () => {
        const _type = 'teacher'
        
        const users = await retrieveAll(_type)

        expect(users).to.exist
        expect(users[0].id).to.equal(id3)
        expect(users[1].id).to.equal(id4)

    })

/*     it('error because incorrect id', async() => {
        const _id = '5d66385aa9cc484ad9727cb4'
        try{

            await retrieveUser(_id)
            
        }catch(error){
            
            expect(error.message).to.equal(`user with id ${_id} not found`)

        }
    })

    it('error because empty id', async() => {
        try{

            await retrieveUser('')
            
        }catch(error){
            
            expect(error.message).to.equal(`id is empty or blank`)

        }
    })

    it('error because incorrect id', async() => {
        const _id = '5d66385aa9cc484d977cb4'
        try{

            await retrieveUser(_id)
            
        }catch(error){
            
            expect(error).to.exist
            expect(error.message).to.equal(`Cast to ObjectId failed for value "${_id}" at path "_id" for model "User"`)

        }
    }) */

    after(() => database.disconnect())
})