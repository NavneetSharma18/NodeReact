const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
 
  stripe_checkout_session_id:{
    type: String, 
    required: true
  },
  user_id:{
    type: String, 
    required: true
  },
  customer_id:{
    type: String, 
   
  },
  payment_intent_id:{
    type: String, 
   
  },
  products:{
    type: Object,
    required: true
  },
  sub_total:{ 
    type: Number, 
    required: true
  },
  total:{
     type: String,
     required: true
  },
  shipping_address: {
    type: Object,
    required: true
  },
  billing_address: {
    type: Object,
    required: true
  },
  delivery_status: {
    type: String,
    required: true,
    default:"PENDING"
  },
  payment_status: {
    type: String,
    required: true
  }
  
  
},{timestamp:true});

const OrderModel = mongoose.model('Orders', OrderSchema);

module.exports = OrderModel