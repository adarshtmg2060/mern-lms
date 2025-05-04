import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    // Check if user already exists
    const existingUser = await User.find({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
        success: false,
        message: "Failed to register" });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
        }
        res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to login" });
    }
    }
