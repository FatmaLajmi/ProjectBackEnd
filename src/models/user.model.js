import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true,
        validator: isEmail
    },
    password: {
        type: String,
        required: true,
        minlength: 6

    },
    name: {
        type: String,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.index({ email: 1 }, { unique: true });

// Create and export the model
export default mongoose.model("User", userSchema);