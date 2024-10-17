
import User from "../Database/userSchema.js"
import { generateToken } from "../utils/jwt.js"

class AdminController{


    



    login=async(req,res)=>{

        try {

            const{email,password}=req.body

            const admin=await User.findOne({email,password})
            console.log("admin:",admin)

            if(!admin){
                return res.status(400).json({message:"invalid username or password"})
            }else{

                if(admin.isAdmin==true){

                  
                    const token=generateToken(admin)
                    
                    return res.status(200).json({message:"Admin Login SuccessFull",data:admin,token})

                }else{
                    return res.status(404).json({message:"No admin found"})
                }
            }


            
        } catch (error) {

            res.status(500).send({message:"Internal Server Error"})
            
        }
    }


    getAllUsers=async(req,res)=>{

        try {
    
            
            const users= await User.find({isAdmin:false})
            console.log('users ',users);
            
            if(!users.length){

                res.json({message:"No users found"})
               
            }else{
                res.status(200).json({data:users})
    
            }
            
        } catch (error) {

            res.status(500).send({message:"Internal server error"})
            
        }       
    

    }


    deleteUser=async(req,res)=>{

        try {

            const{id}=req.params
            const user=await User.findByIdAndDelete(id)

            if(!user){
                res.status(404).json({message:"user not found"})
            }else{
                res.status(200).json({message:"Deleted Sucessfully",data:user})
            }

            
        } catch (error) {

            res.status(500).send({message:"Internal server error"})
            
        }
    }

    searchUser=async(req,res)=>{

        try {

            console.log("inside search user")

            const{username}=req.body

            const user= await User.findOne({username})
           
            if(!user){
                res.status(404).json({message:"User not found"})
            }else{
                res.status(200).json({data:user})
            }
            
        } catch (error) {

            res.status(500).send({message:"Internal Server Error"})
            
        }
    }

    updateUser=async(req,res)=>{

        try {

            const{id}=req.params
            const{username,email}=req.body

            const user=await User.findById(id)
            console.log("user:",user)
            if(!user){

              return  res.status(404).json({message:"user not found"})
            }else{

                // user.username=username,
                // user.email=email
                user.username = username || user.username; // Update username if provided
                user.email = email || user.email; // Update email if provided

                await user.save()
            
                

                res.status(200).json({message:"Updated Successfully",data:user})
            }
            
        } catch (error) {

            res.status(500).send({message:"Internal Server Error"})
            
        }
    }






}


export default new AdminController()