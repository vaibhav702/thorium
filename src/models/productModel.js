const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  { 
    name:String,
	category:String,
	price:{                                   //mandatory property
        type:Number,
        required:true
    }
  }, { timestamp: true }
  );
  module.exports = mongoose.model("Product",productSchema);
  