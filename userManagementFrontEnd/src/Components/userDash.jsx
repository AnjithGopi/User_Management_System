import "./userDash.css";

import { useSelector,useDispatch } from "react-redux";
import { logout,updateProfilePicture } from "../authSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

function UserDash() {

  const {user}=useSelector(state=>state.auth)
  const [newProfilePicture,setNewProfilePicture]=useState(null)
  const dispatch=useDispatch()

  const handleLogout=()=>{

    dispatch(logout())

  }


  const handleProfilePictureChange=(event)=>{
    console.log("profile picture change called")
    const file=event.target.files[0]
    if(file){
      console.log("file got:",file)
      setNewProfilePicture(file)
    }

  }

  const handleUpdateProfilePicture=async()=>{
    console.log("update profile picture called")
    const formData = new FormData();
    formData.append('profilePicture', newProfilePicture)

    try {
        await dispatch(updateProfilePicture(formData)).unwrap(); // Dispatch the action and handle the promise
        console.log("Profile picture updated successfully");
        alert("profile Picture changed Successfully")
    } catch (error) {
        console.error("Failed to update profile picture:", error);
  
    }

  }
  


  return (
    <div className="dashboard-container">
     
     <div className="dashboard-card">
  {user ? (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}</h2>
      {user.profilePicture && (
        <img 
          src={user.profilePicture} 
          alt={`${user.username}'s profile`} 
          style={{
            width: '100px',   
            height: '100px', 
            borderRadius: '50%', 
            objectFit: 'cover' 
          }} 
          className="profile-picture"
        />
      )}
       <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfilePictureChange} 
            />
            <button onClick={handleUpdateProfilePicture}>Update Profile Picture</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <>
      <h2>User needs to login</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  )}
</div>
    </div>
  );
}

export default UserDash;
