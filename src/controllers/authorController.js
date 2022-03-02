const authorModel= require("../models/authorsModel")

const createNewAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await authorModel.create(author)
    res.send({data: authorCreated})
}

// const getAuthorsData= async function (req, res) {
//     let authors = await authorModel.find()
//     res.send({data: authors})

// }
module.exports.createNewAuthor= createNewAuthor
// module.exports.getAuthorsData= getAuthorsData