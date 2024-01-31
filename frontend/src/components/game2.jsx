/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import { useEffect } from "react";
import Phaser from "phaser";
import secondmap from "../assets/TileMaps/secondmpa.json";
import Background from "../assets/Tiles/Legacy-Fantasy - High Forest 2.0/Legacy-Fantasy - High Forest 2.3/Background/Background.png";
import Tiles from "../assets/Tiles/Legacy-Fantasy - High Forest 2.0/Legacy-Fantasy - High Forest 2.3/Assets/Tiles.png";
import Rocks from "../assets/Tiles/Legacy-Fantasy - High Forest 2.0/Legacy-Fantasy - High Forest 2.3/Assets/Props-Rocks.png";
import Trees from "../assets/Tiles/Legacy-Fantasy - High Forest 2.0/Legacy-Fantasy - High Forest 2.3/Trees/Green-Tree.png";
import champ from "../assets/Tiles/Legacy-Fantasy - High Forest 2.0/Legacy-Fantasy - High Forest 2.3/Assets/Tree-Assets.png";

function Game2() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 320,
      height: 320,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
        },
      },
      parent: "phaserContainer",
      scene: {
        preload: preload,
        create: create,
        // update: update,
      },
    };
    function preload() {
      this.load.image("Background", Background);
      this.load.image("Tiles", Tiles);
      this.load.image("Rocks", Rocks);
      this.load.image("Trees", Trees);
      this.load.image("champ", champ);

      this.load.tilemapTiledJSON("map", secondmap);
    }
    const game = new Phaser.Game(gameConfig);
    // let platforms;
    // let player;
    // let stars;
    // let score = 0;
    // let scoreText;
    // let gameOver = false;
    // let bombs;

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 16,
        tileHeight: 16,
      });
      const background = map.addTilesetImage("Background", "Background");
      const trees = map.addTilesetImage("Green-Tree", "Trees");
      const tiles = map.addTilesetImage("legacy", "Tiles");
      const rock = map.addTilesetImage("legacy rocks", "Rocks");
      const champignon = map.addTilesetImage("legacy Tree-Assets", "champ");

      const allLayer = [background, trees, tiles, rock, champignon];

      // this.level2 = map.createDynamicLayer("arbres", allLayer);
      const back = map.createLayer("background", allLayer, 0, 0);
      const arbres = map.createLayer("arbres", allLayer, 0, 0);
      const water = map.createLayer("0", allLayer, 0, 0);
      const forest = map.createLayer("1", allLayer, 0, 0);

      console.info(water, back, arbres, forest);
    }

    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game2;
