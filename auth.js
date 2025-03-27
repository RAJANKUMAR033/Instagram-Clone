import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); // Connect to MongoDB

// Function to register a new user
const signup = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User registered successfully!");
  } catch (error) {
    console.error("❌ Signup failed:", error);
  }
};

// Function to login a user
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid credentials!");
      return;
    }

    console.log("✅ Login successful! Welcome,", user.username);
  } catch (error) {
    console.error("❌ Login failed:", error);
  }
};

// Uncomment to test functions
// signup("testuser", "test@example.com", "Test@123");
// login("test@example.com", "Test@123");
