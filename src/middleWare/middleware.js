const jwt = require("jsonwebtoken");

const loginValidation = function (req, res, next) {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.send({ status: false, msg: "token must be present" });
  }
  console.log(token);

  let decodedToken = jwt.verify(token, "functionup");
  console.log(decodedToken);
  if (decodedToken.authorId == req.body.authorId) {   //changes done querey to body for creating blog
    next();
  } else {
    return res.send({ status: false, msg: "token is invalid" });
  }
};

module.exports.loginValidation = loginValidation;
