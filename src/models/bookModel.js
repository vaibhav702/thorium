const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const createBook = new mongoose.Schema({


  title: {type:String, required:true, unique:true, trim:true},
  excerpt: {type:String, required:true}, 
  userId: {type:ObjectId, ref:'project3_registerUser' , required:true},
  ISBN: {type:String, required:true, unique:true},
  category: {type:String, required:true},
  subcategory: {type:String, required:true},
  reviews: {type:Number, default: 0},
  deletedAt: {type:String ,default:false}, 
  isDeleted: {type:Boolean, default: false},
  releasedAt: {type:Date, required:true},
 

}, { timestamps: true })
module.exports = mongoose.model("project3_Book", userSchema);

