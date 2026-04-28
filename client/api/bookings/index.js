import connectDB from "../config/db";
import Booking from "../models/Booking";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();

  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (req.method === "POST") {
    try {
      const { service, date, time } = req.body;

      const booking = await Booking.create({
        userId: decoded.id, // ✅ from token
        service,
        date,
        time,
      });

      return res.status(201).json(booking);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.message);
    }
  }

  if (req.method === "GET") {
    try {
      const bookings = await Booking.find({ userId: decoded.id }); // ✅ filter
      return res.status(200).json(bookings);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.message);
    }
  }
}