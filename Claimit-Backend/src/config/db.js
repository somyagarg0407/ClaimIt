const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
