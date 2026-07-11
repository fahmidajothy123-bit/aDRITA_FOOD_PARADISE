import dotenv from "dotenv";
import connectDB from "../config/db.js";
import MenuItem from "../models/MenuItem.js";
import menuSeedData from "./menuSeedData.js";

dotenv.config();

const runSeed = async () => {
  try {
    await connectDB();
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuSeedData);
    console.log("✅ Menu items seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

runSeed();
