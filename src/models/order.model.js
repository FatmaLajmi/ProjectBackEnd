import mongoose from "mongoose";
import {validStatuses} from '../types/status.types.js'

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',                         
    required: true                       
  },

  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Product',                       
          required: true                       
        },
        quantity: {
          type: Number,
          required: true,                     
          min: [1, 'Quantity must be at least 1'] 
        }
      }
    ],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'Order must have at least one product'
    }
  },

  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative'] 
  },

  status: {
    type: String,
    enum: validStatuses,
    default: 'pending'                          
  },

  createdAt: {
    type: Date,
    default: Date.now                          
  }

});

export default mongoose.model("Order", orderSchema);
