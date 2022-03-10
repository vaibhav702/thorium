const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const mid =require("../middleware/auth")
const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try{
      let data = req.body;
  let savedData = await userModel.create(data);
  // console.log(req.newAtribute);
      res.status(201).send({ msg: savedData });
  }
  catch(error){
    console.log("this is an error:".message)
    res.status(500).send({msg:"error",error:error}) 

  }
};


//3 for compare
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};

const getUserData = async function (req, res) {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
}
catch(error){
  console.log("this is an error:".message)
    res.status(500).send({status:false,message:error.message}) 


}
}

const updateUser = async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send("No such user exists");
  }
  

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(200).send({ status: updatedUser, data: updatedUser });
}
  catch(error){
    res.status(500).send({status: false,msg:error.message})

  }
}
const deleteUser = async function (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  
    let userId = req.params.userId;
    console.log(userId)
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }
  
    // let userData = req.body;
    let deletedUser = await userModel.findOneAndUpdate({ _id: userId },{$set:{isDeleted:true}});
    res.send({ status: deletedUser, data: deletedUser });
  };

const postMessage = async function (req, res) {
    let message = req.body.message
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
      //userId for which the request is made. In this case message to be posted.
      let userToBeModified = req.params.userId
      //userId for the logged-in user
      let userLoggedIn = req.params.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.send({status: true, data: updatedUser})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser=deleteUser;