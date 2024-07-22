import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel= async (req,res,next)=>{
    const newHotel= new Hotel(req.body);
try {
    const savedHotel=await newHotel.save();
    res.status(200).json(savedHotel);
} catch (err) {
    next(err);
}
}
export const updateHotel= async (req,res,next)=>{
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new:true}
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err); 
    }
}
export const deleteHotel= async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err); 
    }
}
export const getHotel= async (req,res,next)=>{
    try {
        const hotel=await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
    } catch (err) {
        next(err); 
    }
}
export const getHotels= async (req,res,next)=>{
    try {
        const {min, max, ...others}=req.query;
        const hotels=await Hotel.find(Object.fromEntries(
            Object.entries({
                ...others,
                cheapestPrice:{$gt:min || 1, $lt: max || 999},
            }).filter(([key, _]) => key !== 'limit')
          )).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
       next(err);
    }
}

export const countByCity= async (req,res,next)=>{
    const cities= req.query.cities.split(",")
    try {
        const list= await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    } catch (err) {
       next(err);
    }
}
export const countByType= async (req,res,next)=>{
 

    try {
        const hotelCount= await Hotel.countDocuments({type:"hotel"});
        const apartmentsCount= await Hotel.countDocuments({type:"apartments"});
        const resortsCount= await Hotel.countDocuments({type:"resorts"});
        const villasCount= await Hotel.countDocuments({type:"villas"});
        const cabinsCount= await Hotel.countDocuments({type:"cabins"});

        res.status(200).json([
            {type: "hotel", count:hotelCount},
            {type: "apartments", count:apartmentsCount},
            {type: "resorts", count:resortsCount},
            {type: "villas", count:villasCount},
            {type: "cabins", count:cabinsCount}
        ]);
    } catch (err) {
       next(err);
    }
};


export const getHotelRooms= async (req,res,next)=>{
    try {
        const hotel=await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room)=>{
                return Room.findById(room);
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}