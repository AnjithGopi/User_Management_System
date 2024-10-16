
import express from "express"
import mongoose from "mongoose"

const app=express()
 import userRoute from "./src/Routes/userRoute.js"
 import adminRoute from "./src/Routes/adminRoute.js"
import user from './src/Routes/userRoute.js'


app.use('/uploads', express.static('./src/uploads'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',userRoute)
app.use("/admin",adminRoute)


mongoose.connect("mongodb://127.0.0.1:27017/userManagementRedux")
app.listen(4000,()=>{
    console.log("server is running on http://localhost:4000")
})
