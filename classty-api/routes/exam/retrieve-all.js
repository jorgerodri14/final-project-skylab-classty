const { exam } = require('../../logic')

module.exports = async(req, res) => {
    const { userId ,params: { idSub } } = req

    try {
        const result = await exam.retrieveAll(idSub, userId)
        res.status(201).json({ message: 'exam correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}