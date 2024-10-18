import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import UserLogin from "./src/Components/userLogin"
import UserSignup from "./src/Components/userSignup"
import UserDash from "./src/Components/userDash"
import AdminLogin from "./src/Components/AdminLogin"
import AdminDash from "./src/Components/AdminDash"
// import Header from "./src/Components/header"




function App() {
  return (
  <>


    <Router>

    <div className="container">
        {/* <Header/> */}

      <Routes>
        <Route path="/" element={<UserDash/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/admin/" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<AdminDash/>}/>
        
      </Routes>

    
  
   </div>

  </Router>

  
    
    
    </>
  )
}

export default App
