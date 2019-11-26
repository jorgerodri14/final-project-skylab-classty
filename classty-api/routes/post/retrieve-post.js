const { post } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { idSub } } = req

    try {
        const result = await post.retrievePost(idSub)
        res.status(201).json({ message: 'post correctly retrieve', result})
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}