const { models:{ Subject } } = require('classty-data')

const { validate } = require('classty-utils')

module.exports = function (id) {
    validate.string(id, 'id')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const homework = subject.homeworks

        return homework
    })()
}