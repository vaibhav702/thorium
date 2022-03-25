const bookModel = require("../models/bookModel");
const validator = require("../validator/validator");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const createBook =async function(req,res){
try {
    let data =req.body;
  const {title,excerpt,userId,ISBN,category,subcategory,reviews}=data;
  if(!validator.isValid(title)){
      return res.status(400).send({status:false,message:"not a valid title"})
  }
  if(!validator.isValid(excerpt)){
    return res.status(400).send({status:false,message:"not a valid excerpt"})
}
if(!validator.isValidObjectId(userId)){
    return res.status(400).send({status:false,message:"not a valid UserId"})
}

if(!validator.isValid(ISBN)){
    return res.status(400).send({status:false,message:"not a valid ISBN"})
}
if(!validator.isValid(subcategory)){
    return res.status(400).send({status:false,message:"not a valid subcategory"})
}
if(!validator.isValid(reviews)){
    return res.status(400).send({status:false,message:"not a valid reviews"})
}
if(!validator.isValid(category)){
    return res.status(400).send({status:false,message:"not a valid category"})
}
const cd=new Date()
const releasedAt = `${cd.getFullYear()}/${cd.getMonth()}/${cd.getDate()}`
console.log(releasedAt)
data.releasedAt=releasedAt
    let savedData=await bookModel.create(data)
    return res.status(201).send({status:false,messsage:"books created successfully",data:savedData})

} catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
}
}
module.exports.createBook=createBook

const getBook =async function(req,res){
    try {
        const data=req.query
        // const{userId,category,subcategory}=data;
        if(!(Object.keys(data).length)){

        
        let books=await bookModel.find({isDeleted: false })
       return res.status(200).send({status:true ,message:"get all books",data:books})
        }else{
        let filter = await bookModel.find({ $and: [{ isDeleted: false }, { $or: [{ userId: userId}, { category: category }, { subcategory: subcategory }] }] })
        return res.status(200).send({status:true ,message:"get all books",data:filter})
        }
        
    } catch (error) {
        return res.status(500).send({ status: false, Error: error.message });
    }

}
module.exports.getBook=getBook


const deleteById = function async (req,res) {

    try{
    
    
     if(!validator.isValid(req.params.bookId)&& validator.isValidObjectId(req.params.bookId)){
    
      return res.status(400).send({status:false,message:"bookid is not valid"})
    
     }
    
     let filter = {
    
      isdeleted:false,
    
      _id: req.params.bookId
    
      
    
    
     }
    
    
    
     let deletedBook = await bookModel.findOneAndUpdate(filter, { isDeleted: true, deletedAt: new Date() },{new:true})
     if(!validator.isValid(deletedBook)){
    
        return res.status(404).send({status:false,message:"book not found"})
      
       }
     if (deletedBook) {
    
      return res.status(200).send({ status: true, msg: "book is successfully deleted" })
    
     }
    
    
    
    }

    
    catch (error) {
    
     return res.status(500).send({ status: false, Error: error.message });
    
    }
}
module.exports.deleteById=deleteById
const bookController = async (req,res) =>{
    try {
        const bookId = req.params.bookId;
        if(validator.isValid(req.params)){
            return res.status(400).send({status:false, message:"there no Data Input in request" }) 
        }


        if(validator.isValidObjectId(bookId)){
            return res.status(400).send({status:false, message:"Invalid ObjectId" }) 
        }

        const bookData = await bookModel.findOne({_id:bookId,isDeleted:false})

        if(validator.isValid(bookData)){
            return res.status(404).send({status:false, message:`Book is not found with this ID: ${bookId}` }) 
     
        }
        const reviews = await reviewModel.find({bookId:bookId, isDeleted:false})
        .select({_id:1,bookId:1,reviewedBy:1,reviewedAt:1,rating:1,review:1})

        bookData.reviewsData = reviews
        
        return res.status(200).send({status:true, message: 'Books list', data:bookData})


        
    } catch (error) {
        return res.status(500).send({ status: false, Error: error.message });
        
}
module.exports.bookController=bookController