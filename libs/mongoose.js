import mongoose from "mongoose";
import { MONGO_URL } from "@/constants/config";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
