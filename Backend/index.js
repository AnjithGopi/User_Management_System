
import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import cors from 'cors'

const app=express()
 import userRoute from "./src/Routes/userRoute.js"
 import adminRoute from "./src/Routes/adminRoute.js"

const port=process.env.PORT


app.use('/uploads', express.static('./src/uploads'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/',userRoute)
app.use("/admin",adminRoute)


mongoose.connect("mongodb://127.0.0.1:27017/userManagementRedux")
.then(()=>{
    console.log("Database connected")
})
.catch((error)=>{
    console.log("Database not connected",error.message)
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
