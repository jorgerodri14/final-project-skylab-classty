const { post } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { idSub, idP } } = req

    try {
        await post.removePost(idSub, idP)
        res.status(201).json({ message: 'post correctly remove' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}