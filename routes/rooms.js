import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
const router= express.Router();

//create
router.post("/:hotelId",verifyAdmin, createRoom
);
//update
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id",updateRoomAvailability);

//delete
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom);
//get
router.get("/:id",getRoom);
//getall
router.get("/",getRooms);

export default router;