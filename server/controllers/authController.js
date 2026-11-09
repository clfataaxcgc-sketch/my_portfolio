import Admin from "../models/Admin.js";
import { generateToken, setTokenCookie } from "../utils/generateToken.js";

// @desc Login admin
// @route POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin._id);
    setTokenCookie(res, token);

    res.json({ admin: admin.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

// @desc Logout admin
// @route POST /api/auth/logout
export const logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out" });
};

// @desc Get current admin
// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.json({ admin: req.admin.toSafeObject ? req.admin.toSafeObject() : req.admin });
};
