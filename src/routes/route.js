const express = require('express');
const router = express.Router();


const companyOrder =require('../controllers/companyOrder');
const { mid1 } = require('../middleware/middleware');
// const middle =require("../middleware/middleware")


//post api
router.post('/user',mid1, companyOrder.userCreated)
router.post('/product', companyOrder.productEntry)
router.post('/order',mid1,companyOrder.orderPurchase)








module.exports =router;








