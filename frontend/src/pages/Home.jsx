import "../scss/Home.scss";

function Home() {
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
              <button type="button" className="buttonHome">
                Connexion
              </button>
              <button type="button" className="buttonHome">
                Inscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
