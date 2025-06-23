import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth;  // ✅ comes from Clerk middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ This sets req.user for registerHotel
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
