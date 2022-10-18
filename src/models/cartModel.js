const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId:{
        type: ObjectId,
        ref: "UserCollection", 
        required: true,
        unique: true
    },
  items: [{
    _id:{id:false},
    productId:{
        type: ObjectId,
        ref: "productCollection",
        required: true
    },
    quantity:{
        type: Number, 
        required: true, 
      //  min 1
    }
  }],
  totalPrice:{
    type: Number, 
    required: true, 
  //comment: "Holds total price of all the items in the cart"
},
  totalItems:{
    type: Number, 
    required: true,
  //comment: "Holds total number of items in the cart"
  }
},{ timestamps: true })



module.exports = mongoose.model('cartCollection', cartSchema)