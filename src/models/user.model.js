import mongoose from "mongoose";                     
import isEmail from "validator/lib/isEmail.js";         

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,                                   
    unique: true,                                   
    validate: [isEmail, 'Invalid email']           
  },

  password: {
    type: String,
    required: true,                               
    minlength: 6                                   
  },

  name: {
    type: String,
    required: true                                   
  },

  isAdmin: {
    type: Boolean,
    default: false                                
  }
});

export default mongoose.model("User", userSchema);
