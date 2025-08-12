import { Booking } from "../models/bookingModel.js";

// POST API - Create a new booking (public)
const addBooking = async (req, res) => {
  const { name, email, phone, date, amountPaid, paymentMethod } = req.body;

  if (!name || !email || !phone || !date) {
    return res
      .status(400)
      .json({ error: "Name, email, phone, and date are required" });
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
    return res
      .status(400)
      .json({ error: "Booking date must be within the next 2 months" });
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
    res.status(201).json({
      message: "Booking created in pending state",
      data: savedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save booking", details: error.message });
  }
};

const getAvailTimeSlots = async (req, res) => {
  try {
    const { date } = req.query; // date string YYYY-MM-DD

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const requestedDate = new Date(date);
    requestedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch bookings for the day
    const bookings = await Booking.find({
      date: {
        $gte: requestedDate,
        $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const bookedTimes = bookings.map((item) => {
      const dateObj = new Date(item.date);
      return dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    });

    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
      const slotDate = new Date(requestedDate);
      slotDate.setHours(hour, 0, 0, 0);

      const displayTime12hr = slotDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Is slot in the past relative to now? Only for today
      let cannotBook = false;
      if (requestedDate.getTime() === today.getTime()) {
        const now = new Date();
        if (slotDate.getTime() <= now.getTime()) {
          cannotBook = true;
        }
      }

      timeSlots.push({
        time: displayTime12hr,
        price: hour >= 21 ? 1200 : 800,
        type: hour >= 21 ? "peak" : "off-peak",
        available: !bookedTimes.includes(displayTime12hr) && !cannotBook,
        cannotBook, // new flag
      });
    }

    res.status(200).json(timeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch available time slots",
      details: error.message,
    });
  }
};

// GET API - Retrieve all bookings (admin only)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", details: error.message });
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
    res
      .status(500)
      .json({ error: "Failed to fetch booking", details: error.message });
  }
};

// PUT API - Update booking (admin only)
const updateBooking = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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

const getCustomers = async (req, res) => {
  try {
    const customers = await Booking.aggregate([
      {
        $group: {
          _id: { name: "$name", email: "$email", phone: "$phone" },
          totalBookings: { $sum: 1 },
          lastBooking: { $max: "$date" },
          totalSpent: { $sum: "$amountPaid" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          email: "$_id.email",
          phone: "$_id.phone",
          totalBookings: 1,
          lastBooking: 1,
          totalSpent: 1,
        },
      },
      { $sort: { lastBooking: -1 } }, // optional: show most recent customers first
    ]);

    console.log(customers);

    res.status(200).json(customers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", details: error.message });
  }
};

export {
  addBooking,
  getAvailTimeSlots,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getCustomers,
};
