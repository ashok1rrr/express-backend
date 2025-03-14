const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const ApiResponse = (success, message, data = null, error = null) => {
  return { success, message, data, error };
};

// 🔹 User Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json(ApiResponse(false, "User already exists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json(ApiResponse(true, "User registered successfully"));
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};

// 🔹 User Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(ApiResponse(false, "Invalid credentials (User not found)"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(ApiResponse(false, "Password does not match"));
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json(ApiResponse(true, "Login successful", { token }));
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json(ApiResponse(false, "Server Error", null, error));
  }
};
