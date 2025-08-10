import express from "express";
import { protect } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, this is your dashboard.` });
});

export default router;
