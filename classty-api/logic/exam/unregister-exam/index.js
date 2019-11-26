const { models:{ Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idEx) {
    validate.string(id, 'id')
    validate.string(idEx, 'idH')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const examIndex = subject.exams.findIndex(exam => exam._id.toString()==idEx) 
        
        subject.exams.splice(examIndex, 1)
        
        await subject.save()

    })()
}