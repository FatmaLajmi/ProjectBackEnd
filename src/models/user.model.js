import mongoose from "mongoose";                     
import isEmail from "validator/lib/isEmail.js";   
import isURL from "validator/lib/isURL.js";      

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

  image: {
    type: String,
    validate: [isURL, 'Invalid URL'],
    default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
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
