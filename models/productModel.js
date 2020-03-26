const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  productImage: {
    type: String,
    require: true,
  },
  continents: {
    type: Number,
    default: 1,
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});


productSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
