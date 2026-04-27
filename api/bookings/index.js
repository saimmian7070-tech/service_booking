import connectDB from "../../server/config/db";
import Booking from "../../server/models/Booking";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { userId, service, date, time } = req.body;

      const booking = await Booking.create({
        userId,
        service,
        date,
        time,
      });

      return res.status(201).json(booking);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  if (req.method === "GET") {
    try {
      const bookings = await Booking.find();
      return res.status(200).json(bookings);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}