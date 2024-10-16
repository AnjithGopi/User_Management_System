
import User from "../Database/userSchema.js"

class AdminController{


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






}


export default new AdminController()