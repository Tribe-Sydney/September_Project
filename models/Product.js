const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
  },
  title: {
    type: String,
    required: [true, "A product must have a title"],
  },
  quantity: {
    type: Number,
    required: [true, "A product must have a quantity"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  amount: {
    type: Number,
    required: [true, "A product must have an amount"],
  },
  image: {
    type: String,
    required: [true, "A product must have an image"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
