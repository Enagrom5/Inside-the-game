import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../scss/Component/Navbar.scss";

function NavBar() {
  return (
    <div className="Navabar_container">
      <div className="image_logo">
        <img src={logo} alt="logo" />
        <p className="siteName">Inside the Game</p>
      </div>
      <ul className="Navbar_ul">
        <NavLink to="/" exact activeclassname="selected">
          Home
        </NavLink>
        <NavLink to="/Connexion" activeclassname="selected">
          Contact
        </NavLink>
        <NavLink to="/Game" activeclassname="selected">
          Play
        </NavLink>
      </ul>
    </div>
  );
}

export default NavBar;
