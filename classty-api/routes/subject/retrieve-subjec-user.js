const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { userId } = req

    try {
       const result = await subject.retrieveAllSubjectToStudent(userId)
        res.status(201).json({ message: 'subject correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}