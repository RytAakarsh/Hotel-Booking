import  User from "../models/User.js"

//middleware to check if user is authenticated 

export const protect = async ( requestAnimationFrame, res , next ) => {
    const {userId} = requestAnimationFrame.auth;
    if(!userId) {
        res.json({success: false, message: "not authenticated"})
    }else {
        const user = await User.findById(userId);
        req.user = user;
        next()
    }
}