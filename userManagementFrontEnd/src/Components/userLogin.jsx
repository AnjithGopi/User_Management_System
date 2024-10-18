import {useState,useEffect}from "react"
import "./userLogin.css"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../authSlice';
import { Link } from "react-router-dom";





function UserLogin() {

    const[formData,setFormData]=useState({

        email:"",
        password:""
    })


    const{email,password}=formData

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
        console.log(formData)

        const userData={
            email:formData.email,
            password:formData.password
        }

        dispatch(loginUser(userData))
        
    }

    useEffect(()=>{

        if(isSuccess){

            

            navigate("/")



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
    <h2>User Login</h2>
    <form onSubmit={onsubmit} >
      
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email"id="email" name="email" value={email} placeholder="Enter your email" onChange={handleChange} required/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password"id="password" name="password" value={password} onChange={handleChange} required/>
      </div>
      <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <span>New user?</span><Link to="/signup"><p>click here to Register</p></Link>
    </form>
    {isError && <p>{message}</p>}
  </div>
   
  )
}

export default UserLogin
