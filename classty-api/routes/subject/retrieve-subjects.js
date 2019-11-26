const { subject } = require('../../logic')

module.exports = async(req, res) => {
debugger
    try {
        debugger
       const result = await subject.retrieveSubjects()
        res.status(201).json({ message: 'subject correctly retrieve', result })
        
    } catch ({ message }) {
        debugger
        res.status(400).json({ error: message })
    }
}