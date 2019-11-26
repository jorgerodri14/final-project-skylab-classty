const { models: { Subject, User } } = require('classty-data')

const { validate } = require('classty-utils')

module.exports = function (id, userId) {
    validate.string(id, 'id')
    let rest = []
    return (async () => {

        const subject = await Subject.findById(id)
        
        if (!subject) throw new Error(`wrong student`)

        const student = await User.findById(userId)
        
        if (!student) throw new Error(`wrong student`)

        let result = subject.homeworks.map(_homework => {
            
            let work = _homework.delivery.find( delev => { 
                return userId == delev.student.toString()
            })
            if(work) {return _homework}
        })
        
        result.forEach(res => res===undefined ? null : rest.push(res) )
        
        return rest
    })()
}