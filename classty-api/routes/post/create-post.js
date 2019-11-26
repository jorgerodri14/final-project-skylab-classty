const { post } = require('../../logic')

module.exports = async(req, res) => {
    const { params:{idSub}, body: { _body } } = req
debugger
    try {
        await post.createPost(idSub, _body)
        res.status(201).json({ message: 'post correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}