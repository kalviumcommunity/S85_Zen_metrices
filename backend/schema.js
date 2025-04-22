const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  equipment: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 // ✅ Reference to User model
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
