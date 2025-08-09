// import express from "express";
// import { fetchBookings } from "../controller/bookingController.js";

// const router = express.Router();

// router.get("/bookings", fetchBookings);

// export default router;



import express from 'express';
import { getBookings, getServices } from '../controller/bookingController.js';

const router = express.Router();

router.get('/bookings', getBookings);
router.get('/services', getServices);

export default router;
