import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Benutzer nicht gefunden." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Ungültiges Passwort." });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ user: user, token });
  } catch (err) {
    return res.status(500).json({ message: "Interner Serverfehler" });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Benutzer mit dieser E-Mail existiert bereits." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: `User${(await User.countDocuments()) + 1}`,
      email,
      password: hashedPassword,
      registered: Date.now(),
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Fehler bei der Registrierung.", error: err });
  }
};
