const express =require('express')
const router = express.Router();
const userController =require("../Controller/userController");


router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)  //to create User

module.exports = router;