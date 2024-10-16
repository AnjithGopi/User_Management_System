

import express from "express"
import userController from "../Controllers/userController.js"
import upload from "../Middlewares/uploadMiddleware.js"
import authMiddleware from "../Middlewares/authMIddleware.js"
const userRoute=express.Router()



userRoute.post("/signup",userController.registration)
userRoute.post("/login",userController.login)
userRoute.post('/update-profile',authMiddleware,upload.single('profilePicture'), userController.updateProfile);


export default userRoute