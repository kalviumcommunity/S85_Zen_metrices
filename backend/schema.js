const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  equipment: { type: String },
  difficulty: { type: String, required: true },
  createdBy: { type: String, required: false, default: "Anonymous" } // 👈 Default value
});


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
