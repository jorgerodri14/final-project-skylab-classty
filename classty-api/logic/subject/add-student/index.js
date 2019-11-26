const { models: { Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * 
 * @param {string} id of subject
 * @param {Array} name is array of ids 
 * @param {Array} surname is array of ids 
 * 
 */
module.exports = (name, surname, id) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(id, 'idSubject')
    
    return ( async() => {

        const _student = await User.findOne({name, surname, type: 'student'})
        
        if(!_student) throw Error(`student with name ${name} don´t exists`)

        let subject = await Subject.findById(id)

        if(!subject) throw Error(`subject with id ${id} don´t exits`)

        const stud = subject.students.find(student => student.id==_student._id.toString())

        if(stud) throw Error(`student with name ${name} alreay exits in the subject`)

        subject.students.push(_student._id.toString())
        
        await subject.save()
        
        
    })()
    
}