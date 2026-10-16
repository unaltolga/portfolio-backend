import mongoose from "mongoose";

// Connects to MongoDB Atlas. The connection string comes from .env
// (MONGODB_URI) and points to the database named "portfolio".
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Connected to MongoDB Atlas, database: ${mongoose.connection.name}`
    );
  } catch (err) {
    console.error("Could not connect to MongoDB Atlas:", err.message);
  }
};

export default connectDB;
