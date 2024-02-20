const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

  product_title:{
    type: String, 
    required: true,
    trim: true,
    min: [5, 'Must be at least 5, got {VALUE}'],
    max: 80
  },
  product_description:{ 
    type: String, 
    required: true,
    trim: true,
    min: [50, 'Must be at least 50, got {VALUE}'],
    max: 250
  },
  product_price:{ 
    type: Number, 
    match: /[0-9]/ ,
    required: true,
    trim: true
  },
  product_image:{
     type: String,
     trim: true
  },
  user_id: {
    type: String,
    trim: true
  },
  date: { type: Date, default: Date.now }
  
});

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel