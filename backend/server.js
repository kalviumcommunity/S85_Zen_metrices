const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./model/db"); // Import MongoDB connection file
const Workout = require("./schema"); // Import Workout model

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// API Route to Fetch Workouts
app.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find(); // Fetch all workouts from MongoDB
    res.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
