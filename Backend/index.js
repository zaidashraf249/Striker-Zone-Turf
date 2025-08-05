import express from "express";
import cors from "cors";
import connectDB from "./dbConnect.js";
import messageRouter from "./router/contactRouter.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/v1',messageRouter)





// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
