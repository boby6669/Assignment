
import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const user = await User.create({
      name,
      email,
      department,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
