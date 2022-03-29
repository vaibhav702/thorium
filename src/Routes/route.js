const express =require('express')
const router = express.Router();
const userController =require("../Controller/userController");
const bookController =require("../Controller/bookController")
const reviewController=require("../Controller/reviewController")
const middleware = require("../middleWare/middleware")

//user controller
router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)  //to create User


//book controller
router.post("/books",middleware.authorization, bookController.createBook)
router.get("/books",middleware.authentication, bookController.getBook)
router.get("/books/:bookId",middleware.authentication,bookController.getBookById)
router.put("/books/:bookId",middleware.authorization,bookController.updateBook)
router.delete("/books/:bookId",middleware.authorization,bookController.deleteById)





//review controler
 router.post("/books/:bookId/review",reviewController.addReview)
 router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews)
 router.delete("/books/:bookId/review/:reviewId",reviewController.deletedReview)



 
router.get('*', function(req, res){
    res.status(404).send({status:false, ERROR:"page not found"});
  });



module.exports = router;
