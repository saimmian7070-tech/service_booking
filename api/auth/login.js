import connectDB from "../config/db";
import User from "../models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email, password });

      if (!user) return res.status(400).json("Invalid credentials");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json(err);
    }
  }
    return res.status(405).json({ message: "Method not allowed" });
}