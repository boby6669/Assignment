import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import allowanceRoutes from "./routes/allowanceRoutes.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

app.use(express.json());


connectDB();


app.use("/api/requests", allowanceRoutes);
app.use("/api/users", userRoutes);  


app.get("/", (req, res) => {
  res.send("Employee Travel Allowance Running");
});


app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 5000}`);
});
