import express from "express"
import upload from "../middleware/uploadMiddleware.js";
import { createRoom } from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";


const roomRouter = express.Router();

roomRouter.post("/" , upload.array("images" , 4), protect , createRoom)

export default roomRouter;