import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//  ================== REGISTER / SIGNUP ======================

export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // ================ Validation =======================

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // =================== Check existing user ================

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered"});
    }

    // ============= Hash password ===================

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ======== Create user =====================

    const user = await User.create({ name, email, password: hashedPassword });

    // =========== Generate JWT ================

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ success: true, message: "User registered successfully", token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};


// =================== LOGIN CONTROLLER HERE =====================
 
export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    // ========== Validation ============================

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // ============== Check user =================

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ================== Compare password =====================

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ===================== Generate JWT =========================

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET,{ expiresIn: "7d" });
    res.status(200).json({ success: true, message: "Login successful",token,
    user: { id: user._id, name: user.name, email: user.email}

    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};
