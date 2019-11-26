const { models:{ Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idh) {
    validate.string(id, 'ids')
    validate.string(idh, 'idh')
    return ( async ()=>{

        const subject = await Subject.findById(id)
        
        if (!subject) throw new Error(`wrong credentials`)
    
        const i = subject.homeworks.findIndex(homework => homework.id==idh) 
        
        if(i==-1) throw new Error(`wrong id of card`)
        
        subject.homeworks.splice(i,1)
        
        await subject.save()

        return subject
    })()
}