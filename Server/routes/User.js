import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/login", async (req, res) => {
    const{username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"Username and password are required"});
    }
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }});


export default router;