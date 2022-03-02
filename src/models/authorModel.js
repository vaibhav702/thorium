const mongoose = require('mongoose');
// 1. Write down the schemas for book and authors (keeping the data given below in mind)
// . Also create the documents (corresponding to the data given below) in your database.



const authorSchema = new mongoose.Schema({
    author_id : {
        type:Number,
        required:true
    },
    author_name: String,
    age: Number,
    address : String
},
{timestamps:true})

module.exports = mongoose.model('Author',authorSchema)