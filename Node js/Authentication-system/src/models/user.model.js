import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: [true, "Please add a name"],
    unique: [true, "Name must be unique"],  
  },  
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel; 