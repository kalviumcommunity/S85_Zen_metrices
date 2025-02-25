// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const User = require('./model/db');
const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.use(cors());
app.get("/ping", (req, res) => {
    res.send("pong");
});

app.post('/create',async (req,res)=>{
    const {name,email,age,weight,height,gender,fitnessGoals} = req.body;
    const createUser = await User.create({
        name,
        email,
        age,
        weight,
        height,
        gender,
        fitnessGoals
    });
    res.send(createUser);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
