//-------------------Import---------------------------------//
const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
const validator = require("../validator/validator");
const secretkey = "PROJECT3BOOKMANAGEMENTPROJECTDONYBYGROUP7";
//-------------------authentication---------------------------------//
const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(404)
        .send({ status: false, message: "Please pass token" });
    }

    jwt.verify(token, secretkey, function (error, decode) {
      if (error) {
        //setHeader("Content-Type", "text/JSON")
        return res
          .status(400)
          .setHeader("Content-Type", "text/JSON")
          .send({ status: false, message: error.message });
      }
      next();
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//---------------------------Authorization---------------------------------------------------------------//
const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];

    if (!token) {
      return res
        .status(404)
        .send({ status: false, message: "Please pass token" });
    }
    let decodedToken;
    jwt.verify(token, secretkey, async function (error, decode) {
      if (error) {
        return res.status(400).send({ status: false, message: error.message });
      }
      decodedToken = decode;

      let bookId = req.params.bookId;

      if (!bookId) {
        let userId = req.body.userId;
        console.log(userId, decodedToken.userId, "1");
        if (userId == decodedToken.userId) {
          next();
        } else {
          return res
            .status(401)
            .send({ status: false, message: "You are not authorized" });
        }
      } else {
        if (!validator.isValidObjectId(bookId)) {
          return res
            .status(400)
            .send({ status: false, message: "Error!: objectId is not valid" });
        }
        let bookIdPresent = await bookModel.findOne({
          _id: bookId,
          isDeleted: false,
        });
        // console.log(bookIdPresent)
        if (!bookIdPresent) {
          return res
            .status(400)
            .send({ status: false, msg: "Book id is not present" });
        }

        // console.log(bookIdPresent.userId, decodedToken.userId, "2");
        if (bookIdPresent.userId != decodedToken.userId) {
          return res
            .status(401)
            .send({ status: false, message: "You are not authorized" });
        } else {
          next();
        }
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.authorization = authorization;
module.exports.authentication = authentication;
