const mongoose = require("mongoose");
const ObjectId =mongoose.Schema.Types.ObjectId    // it is user for refrence syntax
const orderSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    product:{
        type:ObjectId,
        ref:'Product'
    },
    isFreeAppUser:Boolean,
    
    amount:Number,
    date:Date

},{ timestamp: true }
);
module.exports = mongoose.model("Order",orderSchema);
