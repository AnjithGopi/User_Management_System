import express from "express"
import adminController from "../Controllers/adminController.js";

const adminRoute=express.Router()

const middle=(req,res,next)=>{
console.log('hiiii');
next()

}

adminRoute.get("/users",middle,adminController.getAllUsers)
adminRoute.delete("/users/:id",adminController.deleteUser)
adminRoute.post("/search",adminController.searchUser)







export default adminRoute


