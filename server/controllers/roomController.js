import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from 'cloudinary';
import Room from "../models/Room.js";


//Api To create a new room for a hotel 

export const createRoom = async ( req , res ) => {
    try {
        const { roomType , pricePerNight , amenities } = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if(!hotel) return res.json({ success: false , message: "Hotel not found"});

        //upload image to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        //wait for all images to be uploaded
       const images = await Promise.all(uploadImages);

       await Room.create({
        hotel: hotel._id,
        roomType,
        pricePerNight: +pricePerNight,
        amenities: JSON.parse(amenities),
        images,
       })
       res.json({success: true , message: "Room Created"})


        
    } catch (error) {
        res.json({success: false , message: error.message})
    }
}


//Api To get all rooms 

export const getRooms = async ( req , res ) => {
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: "hotel",
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({createdAt: -1})
        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false , message: error.message})
    }
}


// Api to get all rooms for specific hotel

export const getOwnerRooms = async ( req , res ) => {
      try {
        const hotelData = await Hotel({owner: req.auth.userId})
        const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
        res.json({success: true, rooms});
      } catch (error) {
        res.json({success: false , message: error.message})
      }
}

// APi to toggle availability of a room 

export const toggleRoomAvailability = async ( req , res ) => {
       try {
        const { roomId } = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true , message: "Room Availability updated"})
       } catch (error) {
        res.json({success: false , message: error.message})
       }
}