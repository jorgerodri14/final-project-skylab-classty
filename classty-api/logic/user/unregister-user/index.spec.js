require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, _user, type

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        type = `mentor`


        await User.deleteMany()
        _user = await User.create({ name, surname, email, password, type })
        id = _user.id

    })

    it('should succeed on correct data', async () => {
        
        const result = await unregisterUser(id, password)
        expect(result).not.to.exist

        const user = await User.findById(id)
        expect(user).not.to.exist

    })

    it('should fail on unexisting user', async () => {
        const _id = '5d62f4d76fdb415d25a14496'

        try {

            await unregisterUser(_id, password)

        } catch (error) {

            expect(error.message).to.equal(`wrong credentials`)

        }
    })

    it('should fail on existing user, because wrong id', async () => {
        try {

            await unregisterUser('', password)

        } catch (error) {
            
            expect(error.message).to.equal(`id is empty or blank`)

        }
    })

    after(() => database.disconnect())
})