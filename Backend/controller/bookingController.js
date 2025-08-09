import { Booking } from "../models/bookingModel.js";

// POST API - Create a new booking (public)
const addBooking = async (req, res) => {
  const { name, email, phone, date, amountPaid, paymentMethod } = req.body;

  if (!name || !email || !phone || !date) {
    return res.status(400).json({ error: "Name, email, phone, and date are required" });
  }

  // Parse date
  const bookingDate = new Date(date);

  if (isNaN(bookingDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  // Ensure minutes are always 00
  if (bookingDate.getMinutes() !== 0) {
    return res.status(400).json({ error: "Minutes must be 00" });
  }

  // Ensure hour is between 0 and 23
  const hour = bookingDate.getHours();
  if (hour < 0 || hour > 23) {
    return res.status(400).json({ error: "Hour must be between 0 and 23" });
  }

  // Limit booking dates: today to +2 months
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  maxDate.setHours(23, 59, 59, 999);

  if (bookingDate < today || bookingDate > maxDate) {
    return res.status(400).json({ error: "Booking date must be within the next 2 months" });
  }

  // Check if the slot is already taken
  const existingBooking = await Booking.findOne({ date: bookingDate });
  if (existingBooking) {
    return res.status(400).json({ error: "This time slot is already booked" });
  }

  try {
    const newBooking = new Booking({
      name,
      email,
      phone,
      date: bookingDate,
      amountPaid: amountPaid || 0,
      paymentMethod: paymentMethod || "upi",
      isBookingConfirmed: false,
      isPaymentDone: false,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking created in pending state", data: savedBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to save booking", details: error.message });
  }
};

// GET API - Retrieve all bookings (admin only)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings", details: error.message });
  }
};

// GET API - Retrieve booking by ID (admin only)
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking", details: error.message });
  }
};

// PUT API - Update booking (admin only)
const updateBooking = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE API - Delete booking (admin only)
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    const removedBooking = await Booking.findByIdAndDelete(id);

    if (!removedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      data: removedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addBooking, getBookings, getBookingById, updateBooking, deleteBooking };
