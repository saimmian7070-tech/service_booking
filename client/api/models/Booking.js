const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  service: String,     // e.g. "Haircut", "Cleaning"
  date: String,
  time: String,
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);