import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../scss/Component/Navbar.scss";

function NavBar() {
  return (
    <div className="Navabar_container">
      <div className="image_logo">
        <img src={logo} alt="logo" />
        <p className="siteName">Inside the Game</p>
      </div>
      <ul className="Navbar_ul">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/Connexion">
          <li>Connexion</li>
        </Link>
        <Link to="/Game">
          <li>Play</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;
