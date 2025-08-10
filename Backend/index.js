import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";

import authRoutes from "./routes/authRoutes.js";
import contactRouter from "./routes/contactRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", contactRouter);
app.use("/api/v1", bookingRouter);
app.use("/api/v1", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
