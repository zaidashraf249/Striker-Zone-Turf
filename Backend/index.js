import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import contactRouter from "./routes/contactRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import loginRouter from "./routes/loginRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB(); // MongoDB connection

app.use("/api/v1", contactRouter);
app.use("/api/v1", bookingRouter); 
app.use("/api/v1", loginRouter); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});