import { getAuth } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(auth.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found in DB" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
