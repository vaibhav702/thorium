//importing all model is controller to use

const user = require("../models/userModel");
const product = require("../models/productModel");
const order = require("../models/orderModel");
//user creation
const userCreated = async function (req, res) {
  let data = req.body;
  let savedData = await user.create(data);
  res.send({ data: savedData });
};

module.exports.userCreated = userCreated;
// for product entry
const productEntry = async function (req, res) {
  let data = req.body;
  let savedData = await product.create(data);
  res.send({ data: savedData });
};
module.exports.productEntry = productEntry;
//for order purchase
const orderPurchase = async function (req, res) {
  let data = req.body;
  let userId = req.body.userId; //to validate userId
  let order1 = await order.create(data); // to create order1
  let productId = req.body.productId; // to validate product id
  let validId = await user.findById(userId); // findiding ID is valid or not
  let product1 = await product.findById(productId);
  if (validId && product1) {
    let validation = req.headers.freeuserapp;
    if (validation == "true") {
      order1.amount = 0;
      order1.isFreeAppUser = true;
      order1.save();
      res.send({ data: order1 });
    } else {
      let a = validId.balance - product1.price;
      if (a > 0) {
        validId.balance = a;
        validId.save();
        res.send({ data: validId });
      } else {
        res.send({ msg: "insufficient amount" });
      }
    }
  } else {
    res.send("the userId and Product Id is Not valid please put valid user id");
  }
};
module.exports.orderPurchase = orderPurchase;
