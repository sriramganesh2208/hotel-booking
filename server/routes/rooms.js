const express =require("express")

const { verifyToken,verifyUser,verifyAdmin } = require("../utils/VerifyToken");

const router =express.Router();

const {createRoom,updateRoom,deleteRoom,getRoom,getRooms} = require("../controllers/room");

//create
router.post("/:hotelid",verifyAdmin,createRoom) // only admin can create room

//update
router.put("/:id",verifyAdmin,updateRoom) //only admin can update room

//delete   //2 id we should pass 1st one for rooms id && 2nd for hotel id
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom) //only admin can delete room
               
//get
router.get("/:id",getRoom)

//get all
router.get("/",getRooms)

module.exports =router;