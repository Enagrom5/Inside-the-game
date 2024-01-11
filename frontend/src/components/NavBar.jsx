import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <ul>
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
