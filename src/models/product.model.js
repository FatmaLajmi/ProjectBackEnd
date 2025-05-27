// Import Mongoose library to define the schema and interact with MongoDB
import mongoose from "mongoose";
import isURL from "validator/lib/isURL"; // Validator to check if a string is a valid URL

// Define the schema for a product
const productSchema = new mongoose.Schema({

  // Name of the product
  name: {
    type: String,          // Must be a string
    required: true         // This field is mandatory
  },

  // Optional description of the product
  description: {
    type: String,          // Should be a string if provided
  },

  // Price of the product
  price: {
    type: Number,          // Must be a number
    required: true,        // Price is mandatory
    min: 0                 // Price cannot be negative (correct keyword is 'min', not 'minlength')
  },

  // Image URL of the product
  image: {
    type: String,          // Should be a string containing the URL
    validate: [isURL, 'Invalid URL'], // Validate if it is a valid URL format
    default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg", // Default image if none is provided
  },

  // Reference to the category this product belongs to
  category: {
    type: mongoose.Schema.Types.ObjectId, // Store MongoDB ObjectId referencing Category document
    ref: "Category",                      // Reference model name (should match your category model export)
    required: true,                       // Category is mandatory
  },

  // Number of items in stock
  stock: {
    type: Number,         // Must be a number
    required: true,       // Stock quantity is mandatory
    min: 0                // Stock cannot be negative (use 'min' instead of 'minlength')
  }

});

// Create and export the model
// This will create a 'products' collection in MongoDB (Mongoose pluralizes the model name)
export default mongoose.model("Product", productSchema);
