const mongoose = require("mongoose");

const Products = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    require: [true, "Product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.4,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: `{VALUE} is not a valid company`, // {Value} ==> what user provides
    },
    //enum: ["ikea", "liddy", "caressa", "marcos"], // ! Limit possible options to select
  },
});

module.exports = mongoose.model("Products", Products);
