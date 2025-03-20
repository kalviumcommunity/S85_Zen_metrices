const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  exercises: { type: [String], required: true }, // Array of exercises
  createdBy: { type: String, required: true },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
