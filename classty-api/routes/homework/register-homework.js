const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{idSub}, body: {  title, comment, expiry, delivery=[] } } = req
    const _body ={ title, comment, expiry, delivery} 

debugger
    try {
        await homework.registerHomework(idSub, _body)
        res.status(201).json({ message: 'homework correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}