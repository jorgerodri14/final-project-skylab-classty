const { exam } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { id, idEx } } = req

    try {
        await exam.unregisterExam(id, idEx)
        res.status(201).json({ message: 'exam correctly unregister' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}