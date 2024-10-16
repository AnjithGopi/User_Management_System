
import User from "../Database/userSchema.js"

class AdminController{


    getAllUsers=async(req,res)=>{

        try {


            console.log('in Admin controller');
            
            const users= await User.find({isAdmin:false})
            console.log('users ',users);
            
            if(!users.length){

                res.json({message:"No users found"})
               
            }else{
                res.status(200).json({data:users})
    
            }
            
        } catch (error) {

            res.status(400)
            
        }






       
       


    }
}


export default new AdminController()