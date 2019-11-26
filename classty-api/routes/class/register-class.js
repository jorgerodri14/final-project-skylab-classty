const { _class } = require('../../logic')

module.exports = async(req, res) => {
    const { userId ,body: { nameClass, students=[], teachers=[] } } = req
debugger
    try {
        await _class.registerClass(userId, nameClass, students, teachers)
        res.status(201).json({ message: 'class correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}