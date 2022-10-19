const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const v = require('../validations/validation')
const cartModel = require('../models/cartModel')


//------------------------------|| CREATE ORDER ||----------------------------------
const createOrder = async function (req, res) {
    try {
      let userId = req.params.userId;
      let data = req.body;
      if (!v.isValidObjectId(userId))
        return res.status(400).send({ status: false, message: "invalid userId" });
  
      let User = await userModel.findOne({ _id: userId });
  
      if (!User) {
        return res.status(404).send({ status: false, message: "NO User Found" });
      }
      let { cartId, cancellable, status } = data;
  
      if (!v.isvalidRequest(data)) {return res.status(400).send({ status: false, message: "Please Enter Data In Request Body" })}
  
      data["userId"] = userId;
  
      if (!v.isValidSpace(cartId)) { return res.status(400).send({ status: "false", msg: "Please Enter cartId" })}
  
      if (!v.isValidObjectId(cartId)) { return res.status(400).send({ status: "false", msg: "invalid cartId" })}
  
      let CartExist = await cartModel.findOne({ userId:userId, _id:cartId })
  
      if (!CartExist) {return res.status(404).send({ status: false, message: "No Cart Found" })}
  
      if (!v.isValidString(cancellable)) { return res.status(400).send({ status: false, message: "enter true or false" })}
      if (cancellable) {
        if (!(cancellable == true || cancellable == false)) return res.status(400).send({ status: false, message: "cancellable  contain only boolean value" })}
  
      if (!v.isValidString(status)) { return res.status(400).send({ status: false, message: "Please Enter The Status" })}
  
      if (status) { if (!["pending", "completed", "cancled"].includes(status))
      { return res.status(400).send({ status: false, message: "it can contain only [pending, completed, cancled] values"})}}
  
      let ExistCartData = await cartModel.findById(cartId)
  
      data.items = ExistCartData.items;
      data.totalPrice = ExistCartData.totalPrice;
      data.totalItems = ExistCartData.totalItems;
  
      let totalQuantity = 0;
      for (let i = 0; i < ExistCartData.items.length; i++) {
        totalQuantity += ExistCartData.items[i].quantity }
        data.totalQuantity = totalQuantity;
  
      const orderdata = await orderModel.create(data);
  
      await cartModel.findOneAndUpdate( { _id: cartId, userId: userId }, { $set: { items: [], totalPrice: 0, totalItems: 0 }})
      return res.status(201).send({ status: true, msg: "Order Created Success", data: orderdata })
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  }

//------------------------------|| UPDATE ORDER ||----------------------------------

const updateOrder = async function(req, res){
    try {
    
    
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports = {createOrder, updateOrder}








