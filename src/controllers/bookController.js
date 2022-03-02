const { count } = require("console")
const authorModel = require("../models/authorsModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createNewBook = async function (req, res) {
    let book = req.body
    let authorId = book.authorId
    let publisherId = book.publisherId
    if(!authorId) return res.send("authorId required")

    let author = await authorModel.findById(authorId)
    if(!author) return res.send("no author is present with given id")
    if(!publisherId) return res.send("publisher details required")
    let publisher = await publisherModel.findById(publisherId)
    if(!publisherId) return res.send ("publisher id is incorrect")
    let bookCreated = await bookModel.create(book) 
    return res.send({data:bookCreated})
}


const getBooksDataWithAuthorDetail = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data:specificBook})
}
    

module.exports.createNewBook= createNewBook

module.exports.getBooksDataWithAuthorDetail=getBooksDataWithAuthorDetail