const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{ idSub } } = req
debugger
    try {
        debugger
       const result = await subject.retrieveStudents(idSub)
       debugger
        res.status(201).json({ message: 'retrieve list correctly ', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}