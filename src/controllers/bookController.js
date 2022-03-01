const {count} = require('console');
const bookModel = require('../models/bookModel');
const BookModel = require("../models/bookModel")

const createBook = async (request, response) => {
    const data = request.body;
    const  savedData = await BookModel.create(data);
    response.send({
        msg: savedData
    });
}
const bookData = async (req, res) =>{
    const data = request.body;
    const savedBooks = await bookModel.find(data)
    res.send({msg:savedBooks})
}
const booksList = async (request, response) => {
    const dataGet = await BookModel.find().select({
        'bookName': 1,
        'authorName': 1,
        '_id': 0
    });
    response.send({
        msg: dataGet
    });
}

const getBooksInYear = async (request, response) => {
    const year = request.body.year;
    const  dataGet = await BookModel.find({
        'year': year
    }).select({
        'bookName': 1,
        '_id': 0
    });
    response.send({
        msg: dataGet
    });
}

const getParticularBooks = async (request, response) => {
    const data = request.body;
    const dataGet = await BookModel.find(data).select({
        'bookName': 1,
        '_id': 0
    });
    response.send({
        msg:  dataGet
    });
}

const getXINRBooks = async (request, response) => {
    const dataRes = await BookModel.find({
        $or: [{
                "indianPrice": "INR400"
            },
            {
                "indianPrice": "INR50"
            },
            {
                "indianPrice": "INR540"
            },
        ]
    });
    response.send({
        msg:  dataRes
    });
}

const getRandomBooks = async (request, response) => {
    const dataGet = await BookModel.find({
        $and: [{
                'totalPages': {
                    $gt: 500
                }
            },
            {
                'stockAvailable': true
            }
        ]
    });
    response.send({
        msg:  dataGet
    });
}



module.exports = {
    createBook: createBook,
    bookData:bookData,
    booksList: booksList,
    getBooksInYear: getBooksInYear,
    getParticularBooks: getParticularBooks,
    getXINRBooks: getXINRBooks,
    getRandomBooks: getRandomBooks
}