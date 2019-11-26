const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idS) {
    validate.string(id, 'id')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const teacher = await User.findOne({_id: idS})

        if (!teacher) throw new Error(`wrong credentials`)
debugger
        return subject.exams

    })()
}