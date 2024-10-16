import express from "express"
import adminController from "../Controllers/adminController.js";

const adminRoute=express.Router()



adminRoute.post("/",adminController.login)
adminRoute.get("/users",adminController.getAllUsers)
adminRoute.delete("/users/:id",adminController.deleteUser)
adminRoute.post("/search",adminController.searchUser)
adminRoute.put('/user/:id',adminController.updateUser)








export default adminRoute


