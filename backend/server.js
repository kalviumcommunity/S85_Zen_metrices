const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./model/db"); // MongoDB connection file
const Workout = require("./schema"); // Workout Model

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Fetch All Workouts
app.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Create New Workout
app.post("/api/workouts", async (req, res) => {
  try {
    const { name, category, duration, equipment, difficulty, createdBy = "Anonymous" } = req.body;
    const newWorkout = new Workout({ name, category, duration, equipment, difficulty, createdBy });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Workout by ID
app.put("/api/workouts/:id", async (req, res) => {
  try {
    const { name, category, duration, equipment, difficulty, createdBy } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { name, category, duration, equipment, difficulty, createdBy },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Workout by ID
app.delete("/api/workouts/:id", async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
