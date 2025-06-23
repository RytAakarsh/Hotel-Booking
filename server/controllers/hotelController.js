import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    console.log("Hotel register hit");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({ success: false, message: "Hotel Already Created" });
    }

    await Hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel Registered Successfully" });

  } catch (error) {
    console.error("registerHotel error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
