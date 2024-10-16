

import express from "express"
import userController from "../Controllers/userController.js"
import upload from "../Middlewares/uploadMiddleware.js"
const userRoute=express.Router()


const middlee=(req,res,next)=>{
    console.log('inside user controller');
    next()
}

userRoute.post("/signup",middlee,userController.registration)
userRoute.post("/login",userController.login)
userRoute.post('/update-profile', upload.single('profilePicture'), userController.updateProfile);


export default userRoute