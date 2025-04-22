const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add more fields if needed (email, role, etc.)
});

const User = mongoose.model("User", userSchema);

module.exports = User;
