const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { name } } = req

    try {
        await subject.unregisterSubject(name)
        res.status(201).json({ message: 'subject correctly unregister' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}