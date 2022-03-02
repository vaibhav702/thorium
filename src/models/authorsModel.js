const mongoose = require('mongoose');

const newAuthorSchema = new mongoose.Schema( { 
   
            authorName:String,
            age:Number,
            address:String,
        },
     { timestamps: true });

module.exports = mongoose.model('newAuthor', newAuthorSchema)
