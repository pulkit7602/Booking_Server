import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
const app=express();
dotenv.config();
// add cors middleware

app.use(express.static('build'));
app.use(cors());
app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
   


const connect= async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!");
});

// middleware

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);




// app.use(require('cors')())

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(8800, function () {
    connect();
    console.log("connected to backend!");
   
  });
