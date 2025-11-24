import mongoose,{Schema} from "mongoose";
const userSchema = new Schema({
  username: { type: String, required: true ,unique:true,lowerCase:true,trim:true,index:true},
  email: { type: String, required: true ,unique:true,lowerCase:true,trim:true},
  fullname: { type: String, required: true ,trim:true,index:true},
  avatar: { type: String, required: true},
  coverImage: { type: String},
  watchHistory:[
    
  ]
  
}, { timestamps: true });

 export const userModel = mongoose.model("User", userSchema);