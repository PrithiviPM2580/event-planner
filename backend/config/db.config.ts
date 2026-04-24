import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
}
