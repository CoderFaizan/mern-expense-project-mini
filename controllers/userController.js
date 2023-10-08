const User = require("../models/userModel");

// Registration controller
const registerUser = async (req, res) => {
  try {
    // Get user data from the request body
    const { username, email, password } = req.body;

    // Check if the user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(200).json({success:false, message: "User with the same email or username already exists." });
    }
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password, // You should hash the password before saving it in a real application
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({success:true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(200).json({ success: false, message: "Internal Server Error" });
  }
};
const loginUser = async (req, res) => {
  try {
    // Get user data from the request body
    const { username, password ,email} = req.body;

    // Find the user by username (assuming username is unique)
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid email or password." });
    }
    if (password !== user.password) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid email or password." });
    }
    res.status(200).json({ success: true, message: "Login successful" ,user});
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(200).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { registerUser ,loginUser};
