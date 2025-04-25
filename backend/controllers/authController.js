const jwt = require("jsonwebtoken");

// Load secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // use dotenv in production

exports.login = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }


  const token = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "1d",
  });

  // Set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure only in production
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({ message: "Login successful", username });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
