/* eslint-disable no-unused-expressions */
import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import Game from "../components/game";
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

function Play() {
  const [/* isLoading */ setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        console.info(res.data.message);
        if (res.data.message === "OK") {
          setIsLoggedIn(true);
          setUserId(res.data.id);
        } else {
          setIsLoggedIn(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 3800);
        }
        setIsLoading(false);
      });
  }, []);
  const save = 1;
  let progress;
  console.info(userId);
  save === 1 ? (progress = progress1) : null;
  save === 2 ? (progress = progress2) : null;
  save === 3 ? (progress = progress3) : null;
  save === 4 ? (progress = progress4) : null;

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
          <button type="button">Se connecter</button>
        </div>
      </section>
    );
  }
  return (
    <div className="play_container">
      <div className="Button_container">
        <p className="anthony">
          Mon ami j'ai besoin que tu me guides jusqu'au niveau 4. Aide-moi! Tu
          pourras suivre ma progression sur la map
        </p>
        <img className="progress" src={progress} alt="progress" />
        <button type="button">Sauvegarde</button>
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
        <Game />
      </div>
    </div>
  );
}

export default Play;
