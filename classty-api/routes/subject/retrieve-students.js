const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{ idSub } } = req

    try {
        
       const result = await subject.retrieveStudents(idSub)
       
        res.status(201).json({ message: 'retrieve list correctly ', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}