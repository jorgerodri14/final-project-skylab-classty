const { _class } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { name } } = req

    try {
        const result = await _class.retrieveClass(name)
        res.status(201).json({ message: 'class correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}