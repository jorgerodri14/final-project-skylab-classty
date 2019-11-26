require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, type

    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        type = 'student'

        await User.deleteMany()
        
        const user = await User.create({ name, surname, email, password, type })
        id = user.id

    })

    it('should succeed on correct data', async () => {

        const user = await retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).not.to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.type).to.equal(type)
        expect(user.password).not.to.exist

    })

    it('error because incorrect id', async() => {
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
    })

    after(() => database.disconnect())
})