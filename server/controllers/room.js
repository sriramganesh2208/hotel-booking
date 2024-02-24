const Room =require("../models/Room")
const Hotel =require("../models/Hotel")



const createRoom =async(req,res,next)=>{

    const hotelId = req.params.hotelid;
    const newRoom =new Room(req.body)

    try{
        const savedRoom =await newRoom.save()

        try{
            await Hotel.findByIdAndUpdate(hotelId, 
                {$push : {rooms: savedRoom._id},
            })
        }catch(err){
            res.status(500).json(err)
        }

        res.status(200).json(savedRoom)
    }catch(err){
        res.status(500).json(err)
    }
}

//update hotel
const updateRoom =async(req,res)=>{

    
    try{
        const updateRoom = await Room.findByIdAndUpdate(
          req.params.id,
          { $set: req.body},
          { new:true})
        res.status(200).json(updateRoom)
    }catch(err){
        res.status(500).json(err)
    }
}

//delete hotel
const deleteRoom =async(req,res)=>{
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
       //
        try{
            await Hotel.findByIdAndUpdate(hotelId, 
                {$pull : {rooms: req.params.id},
            })
        }catch(err){
            res.status(500).json(err)
        }
        //
         res.status(200).json("Room has Succesfully Deleted")
     }catch(err){
         res.status(500).json(err)
     }
}

//get hotel
const getRoom =async(req,res)=>{
    try{
        const Room = await Room.findById(req.params.id)
        res.status(200).json(Room)
    }catch(err){
        res.status(500).json(err)
    }
}

//get all hotels
const getRooms =async(req,res)=>{
    try{
        const Rooms = await Room.find()
        res.status(200).json(Rooms)
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getRoom,
    getRooms,
    deleteRoom,
    updateRoom,
    createRoom
    
}