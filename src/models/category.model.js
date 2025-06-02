// Import Mongoose library to define the schema and interact with MongoDB
import mongoose from "mongoose";

// Define the schema for a category
const categorySchema = new mongoose.Schema({

  
  name: {
    type: String,           
    required: true,         
    unique: true            
  },

  
  description: {
    type: String,           
  },
});

// Create and export the model
// This will create a 'categories' collection in MongoDB (Mongoose pluralizes the model name)
export default mongoose.model("category", categorySchema);
