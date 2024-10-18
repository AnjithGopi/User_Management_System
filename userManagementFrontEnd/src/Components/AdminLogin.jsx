
import {useState,useEffect}from"react"
import "./AdminLogin.css"
import { loginAdmin,reset } from "../authSlice"
import { useNavigate } from "react-router-dom"


import { useSelector,useDispatch } from "react-redux"




function AdminLogin() {

    const [formData,setFormData]=useState({

        email:"",
        password:""

    })

    const dispatch=useDispatch()
    const navigate=useNavigate()

    
    const {  isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
      );
    


    const handleChange=(event)=>{

        setFormData((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value

           
        })) 
    }

   const onsubmit=(event)=>{

    event.preventDefault()

    const userData={
        email:formData.email,
        password:formData.password
    }

    console.log("Admin:",userData)
    dispatch(loginAdmin(userData))

   }


    useEffect(()=>{
        console.log("AdminLogin Rendered")
        if(isSuccess){

            

            navigate("/admin/dashboard")



        }

        if (isError) {
            console.error(message);
          }

          return () => {
            dispatch(reset());
          };
      
       
    }, [isSuccess, isError, message, dispatch, navigate])
  return (
   
    <div className="login-container">
    <h2>Admin Login</h2>
    <form onSubmit={onsubmit} >
      
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email"id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"  required/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password"id="password" name="password" value={formData.password} onChange={handleChange}  required/>
      </div>
      <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
       
    </form>

  </div>
  )
}

export default AdminLogin

