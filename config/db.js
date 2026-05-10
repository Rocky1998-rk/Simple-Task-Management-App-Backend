import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI?.trim();

  try {
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing from the environment.");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected....!");
  } catch (error) {
    console.error("MongoDB Error:", error.message);

    if (
      error.message.includes("querySrv ENOTFOUND") ||
      error.message.includes("ENOTFOUND _mongodb._tcp")
    ) {
      console.error(
        "Atlas SRV lookup failed. Check that the cluster host in MONGO_URI is correct and that this network can resolve MongoDB Atlas DNS records."
      );
      console.error(
        "If this keeps happening, copy the connection string again from Atlas or switch to a non-SRV mongodb:// URI."
      );
    }

    throw error;
  }
};

export default connectDB;
