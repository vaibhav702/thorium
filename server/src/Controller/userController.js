//----------------------import--------------------------------------------------------//
const userModel = require("../models/userModel");
const validator = require("../validator/validator");
const jwt = require("jsonwebtoken");
const validatEmail = require("validator");
//----------------------Register User--------------------------------------------------------//
const registerUser = async function (req, res) {
  try {
    const requestBody = req.body;
    //----------------------Validation Start--------------------------------------------------------//
    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "ERROR! : request body is empty" });
    } else {
      const { title, name, phone, email, password, address, confirmPassword } =
        requestBody;

      if (!validator.isValid(name)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid name" });
      }

      let isName = /^[A-Za-z ]*$/;
      if (!isName.test(name)) {
        return res
          .status(422)
          .send({ status: false, message: "enter valid name" });
      }

      if (!validator.isValid(title)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid title" });
      }

      if (!["Mr", "Mrs", "Miss"].includes(title)) {
        return res.status(400).send({
          status: false,
          message: "enter valid title between Mr, Mrs, Miss",
        });
      }

      if (!validator.isValid(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid phone" });
      }

      if (!/^[1-9]{1}\d{9}$/.test(phone)) {
        return res.status(422).send({
          status: false,
          message:
            "please enter 10 digit number which does not contain 0 at starting position",
        });
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

      if (!validator.isValid(email)) {
        return res.status(400).send({
          status: false,
          message: "email is not present in input request",
        });
      }

      //  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      // if (!/^([a-z0-9\-]+)@([a-z-]+)(?=.*[.]{1,})([a-z]+)$/.test(email)) {
      //   // @gmail.com
      //   return res
      //     .status(422)
      //     .send({
      //       status: false,
      //       message: "email is invalid please enter valid email",
      //     });
      // }

      //       const emailvalidator = require("email-validator");
      // if(validator.validate(req.body.email)){
      //       // Your call to model here
      // }else{
      //    res.status(400).send('Invalid Email');
      // }
      if (!validatEmail.isEmail(email)) {
        return res
          .status(400)
          .send({ status: false, msg: "BAD REQUEST email is invalid " });
      }

      if (!/^[^A-Z]*$/.test(email)) {
        return res.status(400).send({
          status: false,
          msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
        });
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

      if (!validator.isValid(password)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid password" });
      }

      //     At least one upper case English letter, (?=.*?[A-Z])
      // At least one lower case English letter, (?=.*?[a-z])
      // At least one digit, (?=.*?[0-9])
      // At least one special character, (?=.?[#?!@$%^&-])
      // Minimum eight in length .{8,} (with the anchors)
      if (
        !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
          password
        )
      ) {
        return res.status(400).send({
          status: false,
          msg: "Please enter Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        });
      }

      if (!validator.isValid(confirmPassword)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid confirmpassword" });
      }

      if (password !== confirmPassword) {
        return res.status(422).send({
          status: false,
          message: "password does not match with confirm password",
        });
      }

      delete req.body["confirmPassword"];

      if (address == undefined || !validator.isValidRequestBody(address)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid address" });
      }

      const { street, pincode, city } = address;

      if (!validator.isValid(street)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid street address" });
      }

      if (!validator.isValid(pincode)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid pincode" });
      }

      if (!/^[1-9]{1}[0-9]{5}$/.test(pincode)) {
        return res.status(422).send({
          status: false,
          message: `${pincode}enter valid picode of 6 digit and which do not start with 0`,
        });
      }

      if (!validator.isValid(city)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid city name " });
      }
    }

    //----------------------Validation ends--------------------------------------------------------//

    const userData = await userModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: "successfully saved user data",
      data: userData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

//----------------------login User--------------------------------------------------------//
const loginUser = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    //----------------------Validation Start--------------------------------------------------------//
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid email" });
    }

    if (!validatEmail.isEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "BAD REQUEST email is invalid " });
    }

    if (!/^[^A-Z]*$/.test(email)) {
      return res.status(400).send({
        status: false,
        msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
      });
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid password" });
    }

    //----------------------Validation Ends--------------------------------------------------------//

    let user = await userModel.findOne({ email: email, password: password });
    console.log(user);
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "email or the password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        iat: new Date().getTime() / 1000,
      },
      "PROJECT3BOOKMANAGEMENTPROJECTDONYBYGROUP7",
      {
        expiresIn: "99m",
      }
    );

    res.setHeader("x-auth-token", token);
    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

//----------------------Module exports--------------------------------------------------------//
module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;
