import connectDB from "../../server/config/db";
import User from "../../server/models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json("User already exists");
      }

      const user = await User.create({ name, email, password });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}