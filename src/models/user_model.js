import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  status: { type: String, default: "active" },
  
}, { timestamps: true });

 export const userModel = mongoose.model("User", userSchema);