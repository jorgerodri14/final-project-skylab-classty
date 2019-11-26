const { models: { Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a students that don´t are in subject.
 * 
 * @param {string} id of student
 * 
 * @returns {Promise}
 */
module.exports = function (idSub) {
    
    return (async () => {
        
        const subject = await Subject.findOne({ _id: idSub })
        
        let students = await User.find({ type: 'student' }, { password: 0 }).lean()

        if (!subject) throw Error(`Not subject defined`)
        
        return subject.students.map(student => {
            const find = students.find(_student => _student._id.toString() == student.toString())

            if (find) { find.id = find._id.toString()
                
                const { email, name, surname, id  } = find
                return { email, name, surname, id } }
        })
    })()
}