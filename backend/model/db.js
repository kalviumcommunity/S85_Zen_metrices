const mongoose = require('mongoose')
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI)
const userSchemas = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    fitnessGoals: [String],
    createdAt: { type: Date, default: Date.now }
})

<<<<<<< HEAD
=======



>>>>>>> 229f183 (done)
const User=mongoose.model('User',userSchemas)
module.exports=User
