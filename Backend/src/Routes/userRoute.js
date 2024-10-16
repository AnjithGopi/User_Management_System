

import express from "express"
import userController from "../Controllers/userController.js"
const userRoute=express.Router()


const middlee=(req,res,next)=>{
    console.log('inside user controller');
    next()
}

userRoute.post("/signup",middlee,userController.registration)
userRoute.post("/login",userController.login)


export default userRoute