// Import Mongoose library to define the schema and interact with MongoDB
import mongoose from "mongoose";

// Define the schema for a category
const categorySchema = new mongoose.Schema({

  // Name field of the category
  name: {
    type: String,           // Must be a string
    required: true,         // This field is mandatory
    unique: true            // No two categories can have the same name
  },

  // Optional description of the category
  description: {
    type: String,           // Should be a string if provided
  },
});

// Create and export the model
// This will create a 'categories' collection in MongoDB (Mongoose pluralizes the model name)
export default mongoose.model("category", categorySchema);
