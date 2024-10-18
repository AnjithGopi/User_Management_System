

import { Link } from "react-router-dom"

function Header() {
  return (
   <header>
    <div className="login">

        <Link to="/login">Login</Link>

    </div>
    <div className="register">

        <Link to="/signup">Register</Link>

    </div>
   </header>
  )
}

export default Header
