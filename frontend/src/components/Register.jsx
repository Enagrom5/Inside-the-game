import axios from "axios";
import { useState } from "react";
import "../scss/Component/Register.scss";

function Register() {
  const [details, setDetails] = useState({
    name: "",
    firstname: "",
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const isEmailValid = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/;
    return emailPattern.test(value);
  };
  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };
  function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"'>]/g, function toMatch(match) {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return match;
      }
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isEmailValid(details.email)) {
        document.getElementById("errorLog").innerText = "";
        document.getElementById("errorEmail").innerText =
          "Votre Email n'est pas valide";
        document.getElementById("email").classList.add("errorOnPlaceholder");
      } else {
        document.getElementById("errorEmail").innerText = "";
        document.getElementById("errorLog").innerText = "";
        document.getElementById("email").classList.remove("errorOnPlaceholder");

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            pseudo: escapeHtml(details.pseudo),
            name: escapeHtml(details.name),
            firstname: escapeHtml(details.firstname),
            email: escapeHtml(details.email),
            password: escapeHtml(details.password),
          },
          { credentials: "include" }
        );

        console.info(response);
        document.getElementById("successLog").innerText =
          "Inscription en cours...";
        localStorage.setItem("UserToken", response.data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.info("il y a une erreur");
    }
  };
  return (
    <div className="backgroundImageMain SignInMain">
      <div className="SignIn_container ">
        <div className="SignIn_container_title">
          <h1>Connexion</h1>
        </div>
        <form className="SignIn_container_form">
          <div className="form_placeholder">
            <p className="form_placeholder_title">Name</p>
            <input
              className="form_placeholder_input"
              name="name"
              id="name"
              value={details.name || ""}
              onChange={handleDetailsChange}
              type="text"
              placeholder="John"
            />
          </div>
          <div className="form_placeholder">
            <p className="form_placeholder_title">Firstname</p>
            <input
              className="form_placeholder_input"
              name="firstname"
              id="firstname"
              value={details.firstname || ""}
              onChange={handleDetailsChange}
              type="text"
              placeholder="Doe"
            />
          </div>
          <div className="form_placeholder">
            <p className="form_placeholder_title">Pseudo</p>
            <input
              className="form_placeholder_input"
              name="pseudo"
              id="pseudo"
              value={details.pseudo || ""}
              onChange={handleDetailsChange}
              type="text"
              placeholder="Jododu75"
            />
          </div>
          <div className="form_placeholder">
            <p className="form_placeholder_title">Email</p>
            <input
              className="form_placeholder_input"
              name="email"
              id="email"
              value={details.email || ""}
              onChange={handleDetailsChange}
              type="email"
              placeholder="john_doe@exemple.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$"
              required
            />
          </div>
          <div className="form_placeholder">
            <p className="form_placeholder_title">Password</p>
            <input
              className="form_placeholder_input"
              name="password"
              id="password"
              value={details.password || ""}
              onChange={handleDetailsChange}
              maxLength="32"
              minLength="8"
              type="password"
              placeholder="********"
              autoComplete="true"
              aria-current="true"
              required
            />
          </div>
          <div className="form_placeholder">
            <p className="form_placeholder_title"> Confirm Password</p>
            <input
              className="form_placeholder_input"
              name="confirmPassword"
              id="confirmPassword"
              value={details.confirmPassword || ""}
              onChange={handleDetailsChange}
              maxLength="32"
              minLength="8"
              type="password"
              placeholder="********"
              autoComplete="true"
              aria-current="true"
              required
            />
          </div>
          <div className="form_buttons">
            <button
              type="button"
              disabled={!details.email || !details.password}
              onClick={handleSubmit}
              className="signIn"
            >
              Sign In
            </button>
          </div>
          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className="cancel"
          >
            Cancel
          </button>
          <p className="error_container" id="errorEmail" />
          <p className="error_container" id="errorLog" />
          <p className="success_container" id="successLog" />
        </form>
        {details.confirmPassword !== details.password ? (
          <div className="errorOnPlaceholder">
            Le mot de passe de confirmation ne match pas
          </div>
        ) : (
          <p />
        )}
      </div>
    </div>
  );
}

export default Register;
