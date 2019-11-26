const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idP) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        let i = subject.post.findIndex(_post => _post._id.toString() == idP)

        if (i==-1) throw new Error(`post with id ${idP} exist.`)
        
        subject.post.splice(i,1)
        
        await subject.save()
        
        return subject
    })()
}