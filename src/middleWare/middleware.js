const jwt = require('jsonwebtoken');
const bookModel = require('../models/bookModel')
const secretkey = "PROJECT3BOOKMANAGEMENTPROJECTDONYBYGROUP7"

const authentication = async function(req,res,next){

    try {

      let token = req.headers["x-auth-token"];
      if(!token){
          return res.status(404).send({status:false,message:"Please pass token"})
      }
  
      let decodedToken = jwt.verify(token,secretkey)
      if(!decodedToken){
          return res.status(400).send({status:false,msg:"token is invalid"})
      }
  
      next();
  
      
    } catch (error) {
      return res.status(500).send({status:false, message:error.message})
      
    }
}




const authorization = async function(req,res,next){
    let token = req.headers["x-auth-token"];

    if(!token){
        return res.status(404).send({status:false,message:"Please pass token"})
    }

    let decodedToken = jwt.verify(token,secretkey);
    
    let bookId = req.params.bookId;
    console.log(!bookId);
    if(!bookId){
        let userId = req.body.userId;
        console.log(userId,decodedToken.userId,"1");
        if(userId==decodedToken.userId){
            next()
        }else{
            return res.status(401).send({status:false,message:"You are not authorized"})
        }
    }else{
        let bookIdPresent = await bookModel.findOne({_id:bookId,isDeleted:false});
        if(!bookIdPresent){
            return res.status(400).send({status:false,msg:"Book id is not present"})
        }
        
        console.log(bookIdPresent.userId,decodedToken.userId,"2");
        if(bookIdPresent.userId != decodedToken.userId){
            return res.status(401).send({status:false,message:"You are not authorized"});
        }else{
            next();
        }
    }
   



}

module.exports.authorization = authorization
module.exports.authentication = authentication
