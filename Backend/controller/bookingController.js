// // controllers/bookingController.js
// import { getAvailableBookings } from "../services/zohoService.js";

// export const fetchBookings = async (req, res) => {
//   try {
//     const data = await getAvailableBookings();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching Zoho bookings:", error?.response?.data || error.message);
//     res.status(500).json({ message: "Failed to fetch bookings from Zoho" });
//   }
// };


import { fetchAppointments, fetchServices } from '../Services/zohoService.js';

export const getBookings = async (req, res) => {
  try {
    const bookings = await fetchAppointments();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await fetchServices();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};
