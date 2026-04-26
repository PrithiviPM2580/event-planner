import "dotenv/config";
import mongoose from "mongoose";
import { Event } from "@/model/event.model";
import { eventSeedData } from "@/constants/index.constant";

const MONGO_URI = process.env.MONGODB_URI as string;

async function seedEvents() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    // Connect DB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Optional: clear old data
    await Event.deleteMany();
    console.log("🧹 Old events removed");

    // Replace USER_ID with real ObjectId
    // const userId = new mongoose.Types.ObjectId();

    // Insert data
    await Event.insertMany(eventSeedData);

    console.log("🌱 Events seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedEvents();
