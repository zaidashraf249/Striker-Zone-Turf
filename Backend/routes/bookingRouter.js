import express from 'express';
import {
  addBooking, 
  getAvailTimeSlots,
  getBookings, 
  getBookingById, 
  updateBooking, 
  deleteBooking
} from '../controller/bookingController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const bookingRouter = express.Router();

// Public
bookingRouter.post('/', addBooking);
bookingRouter.get('/avail-time-slots', getAvailTimeSlots);

// Admin only
bookingRouter.get('/', authMiddleware, adminMiddleware, getBookings);
bookingRouter.put('/:id', authMiddleware, adminMiddleware, updateBooking);
bookingRouter.delete('/:id', authMiddleware, adminMiddleware, deleteBooking);

export default bookingRouter;
