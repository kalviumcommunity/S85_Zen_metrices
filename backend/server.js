const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./model/db"); // MongoDB connection
const Workout = require("./schema");     // Workout Model
const User = require("./model/user");    // User Model
const { workoutValidationSchema } = require("./validations/validation");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");



const app = express();
app.use(express.json()); // must be before the POST routes

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoutes);


/** ---------------------------
 * Get All Users for Dropdown
 ---------------------------- */
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "name"); // only _id and name
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/** ---------------------------
 * Get Workouts (All or Filtered by createdBy)
 ---------------------------- */
app.get("/api/workouts", async (req, res) => {
  try {
    const filter = req.query.createdBy ? { createdBy: req.query.createdBy } : {};
    const workouts = await Workout.find(filter).populate("createdBy", "name"); // include user name
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/** ---------------------------
 * Create New Workout
 ---------------------------- */
 app.post("/api/workouts", async (req, res) => {
  try {
    const { name, category, duration, equipment, createdBy } = req.body;

    const workout = new Workout({
      name,
      category,
      duration,
      equipment,
      createdBy, // ✅ Associate user
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    console.error("Error adding workout:", error);
    res.status(500).json({ message: "Failed to add workout" });
  }
});


/** ---------------------------
 * Update Workout by ID
 ---------------------------- */
app.put("/api/workouts/:id", async (req, res) => {
  const { error } = workoutValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
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

/** ---------------------------
 * Delete Workout by ID
 ---------------------------- */
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

// POST /api/users - Add a new user
// Add new user
app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
