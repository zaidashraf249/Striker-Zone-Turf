import express from 'express';
import {
  addBooking, 
  getAvailTimeSlots,
  getBookings, 
  getBookingById, 
  updateBooking, 
  deleteBooking,
  getCustomers
} from '../controller/bookingController.js';
import { verifyAdminToken } from '../middleware/auth.js';

const bookingRouter = express.Router();

// Public
bookingRouter.post('/', addBooking);
bookingRouter.get('/avail-time-slots', getAvailTimeSlots);

// Admin only
bookingRouter.get('/get-bookings', verifyAdminToken, getBookings);
bookingRouter.put('/update-booking/:id', verifyAdminToken, updateBooking);
bookingRouter.delete('/delete-booking/:id', verifyAdminToken, deleteBooking);

bookingRouter.get('/get-customers', verifyAdminToken, getCustomers);

export default bookingRouter;
