import mongoose from "mongoose";

// Connects to MongoDB Atlas. The connection string comes from .env
// (MONGODB_URI) and points to the database named "portfolio".
// Safe to call many times: it only connects when there is no connection.
const connectDB = async () => {
  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState === 1) {
    return;
  }
  if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise();
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log(
    `Connected to MongoDB Atlas, database: ${mongoose.connection.name}`
  );
};

export default connectDB;
