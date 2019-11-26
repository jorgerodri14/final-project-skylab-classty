const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * 
 * @param {string} nameSubject
 * @param {Array} students is array of ids 
 * @param {Array} teachers is array of ids 
 * 
 */
module.exports = (nameSubject, students, teachers) => {
    validate.string(nameSubject, 'subject')
    validate.array(students, 'students')
    validate.array(teachers, 'teachers')
    
    return ( async() => {

        const subject = await Subject.find({nameSubject})
        
        if(!subject.length==0) throw Error(`subject with name ${nameSubject} already exists`)

        await Subject.create({ name: nameSubject, students, teachers})
        
    })()
    
}