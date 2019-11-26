const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (idSub, idH, idS) {
    validate.string(idSub, 'id')

    validate.string(idH, 'idH')
    validate.string(idS, 'idS')
    let count=0
    return ( async ()=>{

        const student = await User.findOne({ _id: idS })
        debugger
        if(!student) throw Error(`student with id ${idS} does not exist`)
        const subject = await Subject.findById(idSub)
debugger
        if (!subject) throw new Error(`wrong credentials`)


        subject.homeworks.forEach(homework => {debugger
            if(homework._id.toString() == idH ){
                debugger
                const i = homework.delivery.findIndex(del => del.student.toString()==idS)
                debugger
                homework.delivery.splice(i,1)
                debugger
                count ++
            }
        }) 

        if (count==0 && count > 1) throw Error(`homework with id ${idH} dont exist`)
        
        await subject.save()

debugger
        return subject
    })()
}