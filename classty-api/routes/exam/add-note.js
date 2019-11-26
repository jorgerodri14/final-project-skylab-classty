const { exam } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{ idSub, idEx }, body: { name, surname, valor } } = req

    try {
        await exam.addNote(idSub, idEx, name, surname, valor)
        res.status(201).json({ message: 'note correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}