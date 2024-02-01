/* eslint-disable no-unused-expressions */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import Game1 from "../components/game1";
import Game2 from "../components/game2";
import Game3 from "../components/game3";
import Game4 from "../components/game4";
import bas from "../assets/bas.svg";
import haut from "../assets/haut.svg";
import gauche from "../assets/gauche.svg";
import droite from "../assets/droite.svg";
import enter from "../assets/enter.svg";
import space from "../assets/space.svg";
import progress1 from "../assets/progress1.png";
import progress2 from "../assets/progress2.png";
import progress3 from "../assets/progress3.png";
import progress4 from "../assets/progress4.png";
import mailError from "../assets/EmailError.json";
import "../scss/Component/Game.scss";

function Play() {
  const [/* isLoading */ setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [save, setSave] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [score, setScore] = useState(0);
  // vérifie qu'on est bien connecter pour modifier l'affichage de la page en fonction

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
          setUserId(res.data.id);
          setSave(res.data.save);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
        setIsLoading(false);
      });
  }, []);
  // eslint-disable-next-line no-unused-vars

  let progress;

  // permet in affichage intéractif de la map en fonction du niveau ou on est

  save === 1 ? (progress = progress1) : null;
  save === 2 ? (progress = progress2) : null;
  save === 3 ? (progress = progress3) : null;
  save === 4 ? (progress = progress4) : null;

  // envoi dans le back la progression pour que ce soit mis à jour dans la db

  const saveProgress = () => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/saves`,
        { userId, save },
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.error(err));
  };

  const changeLevel = () => {
    setSave((prev) => prev + 1);
  };

  // si on n'est pas connecté on est invité à le faire

  if (!isLoggedIn) {
    return (
      <section>
        <div className="containererror">
          <Lottie
            loop
            animationData={mailError}
            play
            style={{ width: 120, height: 120 }}
          />
          <h1>Accès Impossible</h1>
          <p className="message">
            {`
        Vous devez vous connecter pour acceder à cette page.  `}
            <br /> {` Vous allez être redirigé(e) vers la page de connexion. `}
          </p>
          <Link to="/">
            <button type="button">Se connecter</button>
          </Link>
        </div>
      </section>
    );
  }
  // si on est connecté on peut jouer

  return (
    <div className="play_container">
      <div className="Button_container">
        <p className="anthony">
          Mon ami j'ai besoin que tu me guides jusqu'au niveau 4. Aide-moi! Tu
          pourras suivre ma progression sur la map
        </p>
        <img className="progress" src={progress} alt="progress" />
        <button type="button" onClick={saveProgress}>
          Sauvegarde
        </button>
      </div>
      <div className="play_container_instruction">
        <div className="screenLeft">
          Commandes du jeu :
          <div className="touche">
            <img src={haut} alt="haut" />
            <p>Haut</p>
          </div>
          <div className="touche">
            <img src={bas} alt="bas" />
            <p>Bas</p>
          </div>
          <div className="touche">
            <img src={droite} alt="droite" />
            <p>Droite</p>
          </div>
          <div className="touche">
            <img src={gauche} alt="gauche" />
            <p>Gauche</p>
          </div>
          <div className="touche">
            <img src={space} alt="space" />
            <p>Sauter</p>
          </div>
          <div className="touche">
            <img src={enter} alt="enter" />
            <p>Attaquer</p>
          </div>
        </div>
        {save === 1 ? <Game1 setScore={setScore} /> : <p />}
        {save === 2 ? <Game2 setScore={setScore} /> : <p />}
        {save === 3 ? <Game3 setScore={setScore} /> : <p />}
        {save === 4 ? <Game4 setScore={setScore} /> : <p />}
        <div className="nextButton">
          <p>Score : {score}</p>
          {score < 1000 ? (
            <button type="button" disabled="disabled">
              Niveau suivant
            </button>
          ) : (
            <button type="button" onClick={changeLevel}>
              Niveau suivant
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Play;
