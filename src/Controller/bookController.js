const bookModel = require("../models/bookModel");
const validator = require("../validator/validator");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const createBook =async function(req,res){
try {
    let data =req.body;
    let savedData=await userModel.create(data)
    return res.status(201).send({status:false,messsage:"books created successfully",data:savedData})

} catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
}
}
module.exports.createBook=createBook