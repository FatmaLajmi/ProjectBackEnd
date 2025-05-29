// Import necessary libraries
import mongoose from "mongoose";                     // MongoDB ODM (Object Data Modeling) library
import isEmail from "validator/lib/isEmail";         // Validator to check for proper email format

// Define the schema for a user
const userSchema = new mongoose.Schema({

  // Email field with validation
  email: {
    type: String,
    required: true,                                   // Email is mandatory
    unique: true,                                     // Ensures no two users have the same email
    validate: [isEmail, 'Invalid email']              // Validates the format of the email using validator.js
  },

  // Password field
  password: {
    type: String,
    required: true,                                   // Password is mandatory
    minlength: 6                                      // Password must be at least 6 characters
  },

  // Name field
  name: {
    type: String,
    required: true                                    // Name is mandatory
  },

  // isAdmin flag to identify admin users
  isAdmin: {
    type: Boolean,
    default: false                                    // Default is regular user (not admin)
  }
});

// Create a unique index on the email field at the database level
userSchema.index({ email: 1 }, { unique: true });

// Export the model to use it elsewhere in your project
export default mongoose.model("User", userSchema);
