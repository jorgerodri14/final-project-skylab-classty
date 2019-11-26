const { users } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { name, surname, email, password, type = 'student' } } = req

    try {
        await users.registerUser(name, surname, email, password, type)
        res.status(201).json({ message: 'user correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}