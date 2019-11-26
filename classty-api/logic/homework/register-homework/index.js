const { models: {Subject, Homework} } = require('classty-data')
const { validate } = require('classty-utils')
const convertDate = require('./convertDate')

module.exports = function (id, body) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        debugger
        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        let exist = subject.homeworks.find(homework => homework.title == body.title)

        if (exist) throw new Error(`homework with title ${homework.title} exist.`)

        const date = convertDate(body.expiry)
        body.expiry = date
        
        const homework = new Homework(body)

        subject.homeworks.unshift(homework)
        
        await subject.save()
        
        return subject
    })()
}