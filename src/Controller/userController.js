const userModel = require("../models/userModel");
const validator = require("../validator/validator");
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res) {
  try {
    const requestBody = req.body;
    if(!validator.isValidRequestBody(requestBody)){
        return res.status(400).send({status:false,message:"not a valid request body"})
    }else{
        const{title,name,phone,email,password,address,confirmPassword}=requestBody;
        if(!validator.isValid(name)){
            return res.status(400).send({status:false,message:"enter valid name"})
        }
        let isName=/^[A-Za-z ]*$/
        if(!isName.test(name)){
            return res.status(422).send({status:false,message:"enter valid name"})
        }

        
        if(!validator.isValid(title)){
            return res.status(400).send({status:false,message:"enter valid title"})
        }
        if(!validator.isValid(phone)){
            return res.status(400).send({status:false,message:"enter valid phone"})
        }
        if (!/^[1-9]\d{9}$/.test(phone)) {
            return res
              .status(422)
              .send({ status: false, message: "please enter 10 digit number which does not contain 0 at starting position" });
          }
         
          const isPhoneAlreadyUsed = await userModel.findOne({
            phone,
            isDeleted: false,
          });
          if (isPhoneAlreadyUsed) {
            return res.status(409).send({
              status: false,
              message: `${phone} this phone number is already used so please put valid input`,
            });
          }
        
        if(!validator.isValid(email)){
            return res.status(400).send({status:false,message:"enter valid email"})
        }
        if (!/^([a-z0-9\.-]+)@([a-z-]+).([a-z]+)$/.test(email)) {
            // john45665@gmail.com
            return res
              .status(422)
              .send({ status: false, message: "email is invalid please enter valid email" });
          }
       
      
          const isEmailAlreadyUsed = await userModel.findOne({
            email,
            isDeleted: false,
          });
          if (isEmailAlreadyUsed) {
            return res.status(409).send({
              status: false,
              message: `${email} is already used so please put valid input`,
            });
        }
        
        if(!validator.isValid(password)){
            return res.status(400).send({status:false,message:"enter valid password"})
        }
        if(!validator.isValid(confirmPassword)){
            return res.status(400).send({status:false,message:"enter valid confirmpassword"})
        }
        if(password!==confirmPassword){
            return res.status(422).send({status:false,message:"password does not match with confirm password"})

        }
        delete req.body["confirmPassword"]

        if(!validator.isValid(address)){
            return res.status(400).send({status:false,message:"enter valid address"})
        }
        const {street,pincode,city}=address;
        if(!validator.isValid(street)){
            return res.status(400).send({status:false,message:"enter valid street address"})
        }
        if(!validator.isValid(pincode)){
            return res.status(400).send({status:false,message:"enter valid pincode"})

        }
        if(!/^[1-9]{1}[0-9]{5}$/.test(pincode)){
            return res.status(422).send({status:false,message:`${pincode}enter valid picode of 6 digit and which do not start with 0`})

        }

        if(!validator.isValid(city)){
            return res.status(400).send({status:false,message:"enter valid city name "})
        }

    }
    console.log(requestBody)
    const userData = await userModel.create(requestBody);
    return res
      .status(201)
      .send({
        status: true,
        message: "successfully saved user data",
        data: userData,
      });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.registerUser = registerUser;
const loginUser = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
   
    if(!validator.isValid(email)){
        return res.status(400).send({status:false,message:"enter valid email"})
    }
    if (!/^([a-z0-9\.-]+)@([a-z-]+).([a-z]+)$/.test(email)) {
        // john45665@gmail.com
        return res
          .status(422)
          .send({ status: false, message: "please enter valid email" });
      }

      if(!validator.isValid(password)){
        return res.status(400).send({status:false,message:"enter valid password"})
    }

    let user = await userModel.findOne({ email: email, password: password });
    console.log(user);
    if (!user)
      return res.send({
        status: false,
        msg: "email or the password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id,
        email:user.email
      },
      "PROJECT3BOOKMANAGEMENTPROJECTDONYBYGROUP7",
      {
        expiresIn: "1m",
      }
    );

    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.loginUser = loginUser;
