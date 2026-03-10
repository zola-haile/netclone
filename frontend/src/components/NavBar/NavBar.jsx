import "./NavBar.css"
import { Link, useLocation } from "react-router-dom";


function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav id='nav_container'>
      <Link to="/" id="nav_brand">NetClone</Link>

      <ul id='nav_list'>
        <li>
          <Link to="/movies" className={`nav_link ${pathname === "/movies" ? "nav_active" : ""}`}>
            Movies
          </Link>
        </li>
        <li>
          <Link to="/shows" className={`nav_link ${pathname === "/shows" ? "nav_active" : ""}`}>
            Shows
          </Link>
        </li>
      </ul>

      <Link to="/user" className={`nav_user_btn ${pathname === "/user" ? "nav_active" : ""}`}>
        My Account
      </Link>
    </nav>
  )
}

export default NavBar
