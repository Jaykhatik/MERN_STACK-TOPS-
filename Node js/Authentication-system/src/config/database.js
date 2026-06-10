import config from "./config.js";
import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("conncted to db");
}

export default connectDB;
