import { transporter } from "../config/emailConfig.js";
import Allowence from "../models/allowanceModel.js";
import User from "../models/User.js";



export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ 
        message: "User not found" 
    });

    const request = new Allowence({
      user: user._id,
      amount,
      description
    });

    await request.save();


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "hr@company.com",
      subject: `New Allowance Request from ${user.name}`,
      text: `Employee: ${user.name}\nEmail: ${user.email}\nAmount: ₹${amount}\nDescription: ${description}\nDate: ${request.date}`
    });

    res.status(201).json({ message: "Request created & HR notified", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getRequests = async (req, res) => {
  try {
    const requests = await Allowence.find().populate("User", "name email department");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ 
        error: error.message 
    });
  }
};


export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Allowence.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) return res.status(404).json({ 
        message: "Request not found" 
    });

    res.json({ 
        message: "Status updated", request 
    });
  } catch (error) {
    res.status(500).json({ 
        error: error.message 
    });
  }
};


export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await Allowence.findByIdAndDelete(id);
    res.json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
