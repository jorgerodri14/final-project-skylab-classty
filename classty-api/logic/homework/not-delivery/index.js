const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (idSub, idH, idS) {
    validate.string(idSub, 'id')

    validate.string(idH, 'idH')
    validate.string(idS, 'idS')
    let count=0
    return ( async ()=>{

        const student = await User.findOne({ _id: idS })
        
        if(!student) throw Error(`student with id ${idS} does not exist`)
        const subject = await Subject.findById(idSub)

        if (!subject) throw new Error(`wrong credentials`)


        subject.homeworks.forEach(homework => {
            if(homework._id.toString() == idH ){
                
                const i = homework.delivery.findIndex(del => del.student.toString()==idS)
                
                homework.delivery.splice(i,1)
                
                count ++
            }
        }) 

        if (count==0 && count > 1) throw Error(`homework with id ${idH} dont exist`)
        
        await subject.save()


        return subject
    })()
}