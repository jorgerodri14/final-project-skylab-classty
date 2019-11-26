const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idS) {
    validate.string(id, 'id')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const student = await User.findOne({_id: idS})

        if (!student) throw new Error(`wrong credentials`)

        return subject.exams.map(_exam => {debugger
            const user = _exam.notes.find( note => {debugger
                return note.student == idS
            })
            _exam.notes = user
            debugger
            return { _exam }
        });

    })()
}