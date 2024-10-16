import express from "express"
import adminController from "../Controllers/adminController.js";

const adminRoute=express.Router()

const middle=(req,res,next)=>{
console.log('hiiii');
next()

}

adminRoute.get("/home",middle,adminController.getAllUsers)






export default adminRoute


