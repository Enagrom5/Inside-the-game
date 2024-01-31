import { useState, useEffect } from "react";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import Connexion from "../components/Connexion";
import Register from "../components/Register";
import "../scss/Home.scss";

function Home() {
  const [open, setOpen] = useState(false);
  const [isConnexion, setIsConnexion] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [/* isLoading */ setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        console.info(res.data.message);
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 3800);
        }
        setIsLoading(false);
      });
  }, []);
  const openConnexion = () => {
    setOpen(true);
    setIsConnexion(!isConnexion);
  };
  const openSignUp = () => {
    setOpen(true);
    setIsSignUp(!isSignUp);
  };
  if (!isLoggedIn) {
    return (
      <div className="HomeAll">
        <div className="explicText">
          <div className="textCard">
            <h1>
              Bienvenue dans <p>Inside the Game</p>
            </h1>
            <div className="corpsTextDiv">
              <p>
                Anthony votre ami développeur à besoin de votre aide. Alors
                qu'il développait un RPG retro il s'est envoyé dans son jeu.
                Votre mission: guidez Anthony à travers les niveaux de son jeu
                pour lui permettre de regagner notre monde.{" "}
              </p>
            </div>
            <div className="Connexion">
              <p className="disclaimer">
                Merci de vous connecter ou de vous inscrire pour jouer!
              </p>
              <div className="HomebuttonContainer">
                <button
                  type="button"
                  className="buttonHome"
                  onClick={openConnexion}
                >
                  Connexion
                </button>

                <button
                  type="button"
                  className="buttonHome"
                  onClick={openSignUp}
                >
                  Inscription
                </button>
              </div>

              {isConnexion ? (
                <Popup open={open} closeOnDocumentClick className="connexion">
                  <Connexion className="connexion" />
                </Popup>
              ) : (
                <p />
              )}
              {isSignUp ? (
                <Popup open={open} closeOnDocumentClick className="register">
                  <Register className="register" />
                </Popup>
              ) : (
                <p />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="HomeAll">
      <div className="explicText">
        <div className="textCard">
          <h1>
            Bienvenue dans <p>Inside the Game</p>
          </h1>
          <div className="corpsTextDiv">
            <p>
              Anthony votre ami développeur à besoin de votre aide. Alors qu'il
              développait un RPG retro il s'est envoyé dans son jeu. Votre
              mission: guidez Anthony à travers les niveaux de son jeu pour lui
              permettre de regagner notre monde.{" "}
            </p>
          </div>
          <div className="Connexion">
            <p className="disclaimer">
              Merci de vous connecter ou de vous inscrire pour jouer!
            </p>
            <div className="HomebuttonContainer">
              <button
                type="button"
                className="buttonHome"
                onClick={openConnexion}
              >
                Connexion
              </button>

              <button type="button" className="buttonHome" onClick={openSignUp}>
                Inscription
              </button>
            </div>

            {isConnexion ? (
              <Popup open={open} closeOnDocumentClick className="connexion">
                Vous êtes déjà connecté.
              </Popup>
            ) : (
              <p />
            )}
            {isSignUp ? (
              <Popup open={open} closeOnDocumentClick className="register">
                Vous êtes déjà connecté. Merci de vous déconnecter si vous
                souhaitez créer un nouveau compte.
              </Popup>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
