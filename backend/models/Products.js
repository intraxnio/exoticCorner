const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products_Schema = new Schema({



  product_name: {
    type: String,
  },

  price: {
    type: Number,
  },

  min_order: {
    type: Number,
  },

  units: {
    type: String,
  },

  product_image: {
    type: String
  },

  is_del: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
  },
});

const Products_Schema_Model = mongoose.model("products", Products_Schema);
module.exports = Products_Schema_Model;
