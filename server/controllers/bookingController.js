const Booking = require("../models/Booking");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};