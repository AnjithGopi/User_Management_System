
import "./userSignup.css"
import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { signupUser,reset } from "../authSlice"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function UserSignup() {



    const [formData,setFormData]=useState({

        username:"",
        email:"",
        password:"",
    })

    const {username,email,password}=formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
      )
    


    const onchange=(event)=>{

        setFormData((prevState)=>({
            ...prevState,
            [event.target.name]:event.target.value

           
        })) 

    }

    const onsubmit=(event)=>{
        event.preventDefault()
        console.log(formData)
        const userData = {
            username,
            email,
            password,
          };
      
          dispatch(signupUser(userData))
    }

    useEffect(()=>{
        if(isSuccess){
            navigate('/login')
        }

        if(isError){
            console.log(message)
        }

        return () => {
            dispatch(reset());
          };
    },[isSuccess, isError, message, dispatch, navigate])

    


  return (

    <div className="signup-container">
    <h2>User Signup</h2>
    <form onSubmit={onsubmit} >
      <div>
        <label htmlFor="username">Username:</label>
        <input  type="text"id="username"name="username" value={username} onChange={onchange} placeholder="Enter your name"required/>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email"id="email" name="email" value={email} onChange={onchange} placeholder="Enter your email" required/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password"id="password" name="password" onChange={onchange} value={password} required/>
      </div>
      <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <br /><br /><br />

        <span>Already a user?</span><Link to="/login"><p>click here to login</p></Link>
    </form>
    {isError && <p>{message}</p>}
  </div>
    
  )
}

export default UserSignup
