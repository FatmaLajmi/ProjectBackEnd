import mongoose from "mongoose";

// Define the schema for an order
const orderSchema = new mongoose.Schema({

  // Reference to the user who placed the order
  user: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    ref: 'User',                         // Reference to 'User' model
    required: true                       // This field is mandatory
  },

  // Array of products in the order, each with product reference and quantity
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // Product ObjectId
          ref: 'Product',                       // Reference to 'Product' model
          required: true                       // Must specify a product
        },
        quantity: {
          type: Number,
          required: true,                      // Quantity must be specified
          min: [1, 'Quantity must be at least 1'] // Quantity must be greater than 0
        }
      }
    ],
    validate: {
      validator: function(arr) {
        // Products array must not be empty
        return arr.length > 0;
      },
      message: 'Order must have at least one product'
    }
  },

  // Total price of the order
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative'] // Price must be zero or more
  },

  // Status of the order with limited options
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'], // Allowed values only
    default: 'pending'                          // Default value is 'pending'
  },

  // Timestamp when order was created
  createdAt: {
    type: Date,
    default: Date.now                           // Defaults to current date/time
  }

});

// Export the model so it can be used in other parts of the app
export default mongoose.model("Order", orderSchema);
