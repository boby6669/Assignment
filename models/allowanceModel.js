import mongoose from "mongoose";

const allowanceRequestSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "User", 
     required: true 
    },
  amount: 
  { type: Number, 
    required: true
  },
  description: 
  { type: String 

  },
  date: 
  { type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
});

const Allowence = mongoose.model("allowenceModel", allowanceRequestSchema);
export default Allowence;