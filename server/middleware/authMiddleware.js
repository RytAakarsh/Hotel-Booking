import  User from "../models/User.js"

//middleware to check if user is authenticated 

// export const protect = async ( requestAnimationFrame, res , next ) => {
//     const {userId} = requestAnimationFrame.auth;
//     if(!userId) {
//         res.json({success: false, message: "not authenticated"})
//     }else {
//         const user = await User.findById(userId);
//         req.user = user;
//         next()
//     }
// }
// middleware/authMiddleware.js
export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    req.user = { _id: userId };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};
