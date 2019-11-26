/* require('dotenv').config()
const { expect } = require('chai')
const uploadImage = require('.')
const { database, models: { User } } = require('classty-data')
const { random } = Math
const fs = require('fs')
const { env: { DB_URL_TEST } } = process
describe('logic - upload image', () => {
    before(() => database.connect(DB_URL_TEST))
    let name, surname, email, password, image, id
    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
        image = fs.createReadStream('./Schema.png')
    })
    it('should succeed on correct image', async () => {
        const result = await uploadImage(id, image)
        expect(result).not.to.exist
        const ad = await User.findById(id)
        expect(ad).to.exist
        expect(ad.image).to.exist
        expect(ad.image).to.have.length.above(0)
        e
    })
    
    after(() => database.disconnect())
}) */