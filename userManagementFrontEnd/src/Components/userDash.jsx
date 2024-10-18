import "./userDash.css";

import { useSelector,useDispatch } from "react-redux";
import { logout } from "../authSlice";
import { Link } from "react-router-dom";

function UserDash() {

  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()

  const handleLogout=()=>{

    dispatch(logout())



  }
  return (
    <div className="dashboard-container">
     
     <div className="dashboard-card">
  {user ? (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}!</h2>
      {user.profilePicture && (
        <img 
          src={user.profilePicture} 
          alt={`${user.username}'s profile`} 
          className="profile-picture"
        />
      )}
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
