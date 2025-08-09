// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./dbConnect.js";
// import messageRouter from "./routes/contactRouter.js";
// import bookingRouter from "./routes/bookingRouter.js"; // ✅ Import new route

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// connectDB();

// // API routes
// app.use('/api/v1', messageRouter);
// app.use("/api/v1", bookingRouter); // ✅ Add Zoho booking routes

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import contactRouter from "./routes/contactRouter.js";
import bookingRouter from "./routes/bookingRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB(); // MongoDB connection

app.use("/api/v1", contactRouter);
app.use("/api/v1", bookingRouter); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
