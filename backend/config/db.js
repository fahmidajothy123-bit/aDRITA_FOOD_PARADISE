import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.warn(`⚠️  Server is starting WITHOUT a database connection. Routes that use the DB (menu, auth, orders, etc.) will fail until MongoDB is connected.`);
    // process.exit(1) removed temporarily for no-DB testing — put it back once MongoDB is set up.
  }
};

export default connectDB;