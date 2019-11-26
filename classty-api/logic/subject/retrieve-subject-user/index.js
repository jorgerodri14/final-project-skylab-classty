const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id of student
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')
    return (async () => {
        let isIn = -1
        let listSub = []
        

        const subjects = await Subject.find({}, {_v: 0}).sort({_id:1}).lean()

        if(!subjects) throw Error(`Not subject definedS`)

        subjects.forEach(subject => {
            isIn = subject.students.findIndex(student => student.toString()==id)
            let subj = {
                id: subject._id.toString(),
                title: subject.name,
                teachers : subject.teachers
            }
            if(isIn > -1) listSub.push(subj)
        
        })
        return listSub
    })()
}