import express from 'express';
import {
  addBooking, 
  getAvailTimeSlots,
  getBookings, 
  getBookingById, 
  updateBooking, 
  deleteBooking
} from '../controller/bookingController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const bookingRouter = express.Router();

// Public
bookingRouter.post('/', addBooking);
bookingRouter.get('/avail-time-slots', getAvailTimeSlots);

// Admin only
bookingRouter.get('/get-bookings', verifyAdminToken, getBookings);
bookingRouter.put('/:id', verifyAdminToken, updateBooking);
bookingRouter.delete('/delete-booking/:id', verifyAdminToken, deleteBooking);

export default bookingRouter;
