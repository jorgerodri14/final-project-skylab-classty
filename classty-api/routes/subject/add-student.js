const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{idSub} , body: { name, surname } } = req

    try {
        await subject.addStudent( name, surname, idSub)
        res.status(201).json({ message: 'student correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}