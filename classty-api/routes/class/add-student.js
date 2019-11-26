const { _class } = require('../../logic')

module.exports = async(req, res) => {
    const {  body: { nameClass, name, surname } } = req

    try {
        await _class.addStudent(name, surname, nameClass)
        res.status(201).json({ message: 'student correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}