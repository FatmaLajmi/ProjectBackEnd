import mongoose from "mongoose";
import isURL from "validator/lib/isURL.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    validate: [isURL, 'Invalid URL'],
    default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

export default mongoose.model("Product", productSchema);
