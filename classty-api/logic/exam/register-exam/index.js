const { models: {Subject, Exam} } = require('classty-data')
const { validate } = require('classty-utils')
const convertDate = require('./convertDate')

module.exports = function (id, title, date, notes) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        let exist = subject.exams.find(exam => exam.title == title)

        if (exist) throw new Error(`homework with title ${title} exist.`)

        const _date = convertDate(date)
        const body={
            title: title,
            date: _date,
            notes: notes
        }
        const exam = new Exam(body)

        subject.exams.unshift(exam)
        
        await subject.save()
        
        return subject
    })()
}