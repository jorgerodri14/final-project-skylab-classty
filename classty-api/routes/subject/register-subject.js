const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { name, students, teachers } } = req

    try {
        await subject.registerSubject(name, students, teachers)
        res.status(201).json({ message: 'subject correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}