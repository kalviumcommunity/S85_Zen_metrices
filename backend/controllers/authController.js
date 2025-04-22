// backend/controllers/authController.js
exports.login = (req, res) => {
    const { username } = req.body;
  
    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }
  
    res.cookie("username", username, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
  
    res.status(200).json({ message: "Login successful", username });
  };
  
  exports.logout = (req, res) => {
    res.clearCookie("username");
    res.status(200).json({ message: "Logout successful" });
  };
  