const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in .env file");
}

mongoose
  .connect(mongoURI) // No need for options in Mongoose 7+
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;
