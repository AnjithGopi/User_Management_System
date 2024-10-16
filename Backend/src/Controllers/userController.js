import User from "../Database/userSchema.js";

class userController{



    registration=async(req,res)=>{

        try {
             console.log("KKKK",req.body)
            const{username,email,password}=req.body
            const user=new User({username,email,password})
            await user.save()

            if(user){
                res.status(200).json({message:"Registration success"})

            }else{
                res.status(400).json({message:"Failed to Register"})
            }

           
    
            
        } catch (error) {

            res.status(500).send({message:"internal server error"})
            
        }

       

        
    }


    login=async(req,res)=>{

        try {


            const {email,password}=req.body

            const userFound= await User.findOne({email,password})

            if(!userFound){
                res.status(400).json({message:"Invalid username or password"})
            }else{

                res.status(200).json({message:"Log in success"})
            }


            
        } catch (error) {

            res.status(500).send({message:"internal server error"})
            
        }

    }



}


export default new userController()