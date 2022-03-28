 const userModel = require("../models/userModel");
 const bookModel =require("../models/bookModel")
 const reviewModel = require('../models/reviewModel')
 const validator = require("../validator/validator");


const addReview = async (req, res) => {

      try {
        const bookId = req.params.bookId
      if (!(validator.isValid(bookId) && validator.isValidObjectId(bookId))) {
    
      return res.status(400).send({ status: false, msg: "ERROR!: Bad request bookId is not present or bookId is not valid" })
    
      }
    
    
      
    
      if (!validator.isValidRequestBody(req.body)) {
     
      return res.status(400).send({ status: false, message: 'Review body is empty' })   
    
      }
    

      let { reviewedBy, rating, review } = req.body
    
    
    //   if (!validator.isValid(reviewedBy)) {
    
    //   return res.status(400).send({ status: false, message: "Bad request reviewedBy is empty" })
    
    
    //   }

    if (!validator.isValid(review)) {
    
      return res.status(400).send({ status: false, message: "Bad request review is empty" })
    
      }

      if (!validator.isValid(rating)) {
    
        return res.status(400).send({ status: false, message: "Bad request rating is empty" }) 
    }
    if(!(/^[1-5]{1}/.test(rating))){
        return res.status(400).send({status:false, message:`ERROR!: ${rating} is not valid rating insert value between 1 to 5`})
    }
      


      let bookData = await bookModel.findOne({ _id: bookId, isDeleted: false })

      if(!(Object.keys(bookData).length)){
          return res.status(404).send({status:false, message:`book with this ID: ${bookId} is not found`})
      }

     //const one = await bookModel.updateOne({_id:bookId, isDeleted:false}, {$inc: {reviews: 1}})
     await bookModel.findOneAndUpdate({_id:bookId, isDeleted:false}, {$inc: {reviews: 1}})
     
     //console.log(one, two)

     req.body.reviewedAt = new Date()//.toLocaleString
     req.body.bookId = bookId

     const newReview = await reviewModel.create(req.body)
      return res.status(201).send({status:true,message: "Thank you for reviewing", data: newReview})


    }catch (error) {
        return res.status(500).send({status:false, Error:error.message})
        
    }
}






const updateReviews = async (req, res) =>{
    try {
        if (!validator.isValid(req.params)) {
            return res
              .status(400)
              .send({ status: false, message: "there no Data Input in request" });
          }

        if(!(Object.keys(req.body).length)){
            return res.status(400).send({status:false, message:"Bad request there is no input data for updation"})
        }

    let bookId = req.params.bookId;
    if(!bookId)bookId=req.query.bookId
    if(!bookId)bookId= req.body.bookId

    if(!bookId){
      return res.status(400).send({
        status:false,
        msg:"bookId is must please provide bookId "})
    }

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid bookId" });
    }

    let reviewId = req.params.reviewId;
    if(!reviewId) reviewId=req.query.reviewId
    if(!reviewId)reviewId= req.body.reviewId

    if(!reviewId){
      return res.status(400).send({
        status:false,
        msg:"bookId is must please provide reviewId "})
    }

    if (!validator.isValidObjectId(reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid reviewId" });
    }


    
    if(bookId){
      
      let bookExists = await bookModel.findOne({bookId:bookId, isDeleted:false})

      if(!bookExists){
        return res.status(404).send({
          status:false, 
          message:`book with this ID: ${bookExists} is not found please enter valid bookId `});
      }
      
    }


    if(reviewId){
      
      let reviewExists = await reviewId.findOne({reviewId:reviewId, isDeleted:false})

      if(reviewExists){
        return res.status(404).send({
          status:false,
          message:`review with this reviewId : ${reviewId} is not found please enter valid reviewId`});
      }
    }

    req.body.reviewedAt = new Date().toLocaleString()

    const newUpdattion = req.body

     await reviewModel.updateOne({reviewId:reviewId, isDeleted:false}, newUpdattion)

     const bookReviews = await bookModel.findOne({bookId:bookId, isDeleted:false});
    
     const booksTotalReviews = await reviewModel.find({bookId:bookId, isDeleted:false})
                                .select({_id:1, bookId:1, reviewedBy:1, reviewedAt:1, rating:1, review:1})

        
    } catch (error) {
        return res.status(500).send({status:false, Error:error.message})
        
    }
}



const deletedReview = async function (req, res) {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;

    try {
        if (!(validator.isValid(bookId) && validator.isValidObjectId(bookId))) {
            return res.status(400).send({
                status: false,
                message: "bookId is not present or Invalid bookId"
            });
        }

        if (!(validator.isValid(reviewId) && validator.isValidObjectId(reviewId))) {
            return res.status(400).send({
                status: false,
                message: "reviewId is not present or Invalid bookId"
            });
        }
    
        let isReviewIdPresent = await reviewModel.findOne({
            _id: reviewId,
            isDeleted: false
        });

        if (isReviewIdPresent == null) {
            return res.status(404).send({
                status: true,
                msg: "No review is present"
            })
        }

        let isBookIdPresent = await bookModel.findOne({
            _id: bookId,
            isDeleted: false
        });

        if (isBookIdPresent == null) {
            return res.status(404).send({
                status: false,
                msg: "No book is found"
            })
        }


         await bookModel.updateOne({
            _id: bookId
        }, {
            $inc: {
                reviews: -1
            }
        })

        const date = new Date()

        let deleteReview = await reviewModel.findByIdAndUpdate(reviewId, {
            isDeleted: true,
            deletedAt: date
        }, {
            new: true
        })

        return res.status(200).send({
            status: true,
            message: deleteReview
        });
    } catch (err) {
        return res.status(500).send({
            msg: err.message
        })
    }

}









module.exports.updateReviews = updateReviews
module.exports.addReview = addReview
module.exports.deletedReview = deletedReview





