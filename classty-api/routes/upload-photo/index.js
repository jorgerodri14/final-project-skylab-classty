const upload = require('../../logic/user/upload')
const Busboy = require('busboy')
module.exports = (req, res) => {
    const { userId } = req
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) =>
        upload(userId, file)
            .then(()  => res.json({ message: 'Deployment image successfully uploaded.'}))
    )
    //busboy.on('finish', () => )
    req.pipe(busboy)
}
