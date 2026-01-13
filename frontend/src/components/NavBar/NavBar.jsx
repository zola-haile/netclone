import "./NavBar.css"
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <nav id='nav_container'>
      <ul id='nav_list'>
        <li><Link to="/"><h2>NetClone</h2></Link></li>
        <li> <Link to="/movies"> <h2>Movies</h2></Link></li>
        <li> <Link to="/shows"> <h2>Shows</h2></Link></li>
        <li><h2>User</h2></li>
      </ul>
    </nav>
  )
}

export default NavBar