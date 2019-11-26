const { models: { Subject, User } } = require('classty-data')

const { validate } = require('classty-utils')

module.exports = function (id, userId) {
    validate.string(id, 'id')
    let rest = []
    return (async () => {

        const subject = await Subject.findById(id)
        debugger
        if (!subject) throw new Error(`wrong student`)

        const student = await User.findById(userId)
        debugger
        if (!student) throw new Error(`wrong student`)

        let result = subject.homeworks.map(_homework => {
            debugger
            let work = _homework.delivery.find( delev => { debugger
                return userId == delev.student.toString()
            })
            if(!work) {return _homework}
        })
        
        debugger
        result.forEach(res => res===undefined ? null : rest.push(res) )
        debugger
        return rest
    })()
}