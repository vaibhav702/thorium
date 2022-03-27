const express =require('express')
const router = express.Router();
const userController =require("../Controller/userController");
const bookController =require("../Controller/bookController")


router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)  //to create User




router.post("/books",bookController.createBook)
router.get("/books",bookController.getBook)
router.get("/books/:bookId",bookController.getBookById)
router.put("books/:bookId",bookController.updateBook)


router.delete("/books/:bookId",bookController.deleteById)

module.exports = router;
