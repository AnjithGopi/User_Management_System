import express from "express"
import adminController from "../Controllers/adminController.js";
import authMiddleware from "../Middlewares/authMIddleware.js";

const adminRoute=express.Router()



adminRoute.post("/",adminController.login)
adminRoute.get("/users",authMiddleware,adminController.getAllUsers)
adminRoute.delete("/users/:id",adminController.deleteUser)
adminRoute.post("/search",adminController.searchUser)
adminRoute.put('/user/:id',adminController.updateUser)








export default adminRoute


