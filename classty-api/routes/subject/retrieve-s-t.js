const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { userId } = req
debugger
    try {debugger
       const result = await subject.retrieveST(userId)
        res.status(201).json({ message: 'retrieve list correctly ', result })
        debugger
    } catch ({ message }) {debugger
        res.status(400).json({ error: message })
    }
}