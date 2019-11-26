const { exam } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{ idSub },body: {title, date, notes=[]} } = req
debugger
    try {
        await exam.registerExam(idSub, title, date, notes)
        res.status(201).json({ message: 'exam correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}