
import { NavLink } from "react-router-dom"
import { useState } from 'react'
import menuIcon from "../Images/navbar-icon.svg"
import { ROUTES } from './definitionRoutes'

import '../Styles/navbar.css'

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <nav>
      <img src={menuIcon} alt="Menu icon" className="nav-icon" onClick={() => setShowMenu(!showMenu)} />
      <div className={`${showMenu ? "nav-items" : "none"}`}>
        <NavLink to="/" className="nav-link"> Home </NavLink>
        <NavLink to={ROUTES.cheesecakes} className="nav-link"> Cheesecakes </NavLink>
        <NavLink to={ROUTES.burgers} className="nav-link"> Burgers </NavLink>
        {/* <NavLink to="/restaurants" className="nav-link"> Restaurants </NavLink> */}
      </div>
    </nav>
  )
}

export default NavBar