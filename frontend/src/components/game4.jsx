/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import { useEffect } from "react";
import Phaser from "phaser";
import fourmap from "../assets/TileMaps/fourmap.json";
import water from "../assets/Tiles/The Fan-tasy Tileset (Free) 1.2.4/The Fan-tasy Tileset (Free)/Art/Animations/Tileset_Water.png";
import props from "../assets/Tiles/The Fan-tasy Tileset (Free) 1.2.4/The Fan-tasy Tileset (Free)/Art/Props.png";
import tree from "../assets/Tiles/The Fan-tasy Tileset (Free) 1.2.4/The Fan-tasy Tileset (Free)/Art/Trees_Bushes.png";
import road from "../assets/Tiles/The Fan-tasy Tileset (Free) 1.2.4/The Fan-tasy Tileset (Free)/Art/Tileset_Road.png";
import grass from "../assets/Tiles/The Fan-tasy Tileset (Free) 1.2.4/The Fan-tasy Tileset (Free)/Art/Tileset_Ground.png";
import rock from "../assets/Tiles/The Fan-tasy Tileset (Free) 1.2.4/The Fan-tasy Tileset (Free)/Art/Rocks.png";

function Game() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 350,
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
      this.load.image("Tileset_Water", water);
      this.load.image("Props", props);
      this.load.image("Trees_Bushes", tree);
      this.load.image("Tileset_Road", road);
      this.load.image("Tileset_Ground", grass);
      this.load.image("Rocks", rock);
      this.load.tilemapTiledJSON("map", fourmap);
    }
    const game = new Phaser.Game(gameConfig);

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 16,
        tileHeight: 16,
      });

      const Water = map.addTilesetImage("Tileset_Water", "Tileset_Water");
      const Props = map.addTilesetImage("Props", "Props");
      const Tree = map.addTilesetImage("Trees_Bushes", "Trees_Bushes");
      const Road = map.addTilesetImage("Tileset_Road", "Tileset_Road");
      const Ground = map.addTilesetImage("Tileset_Ground", "Tileset_Ground");
      const Rocks = map.addTilesetImage("Rocks", "Rocks");

      const allLayer = [Water, Props, Tree, Road, Ground, Rocks];

      const layer1 = map.createLayer("Calque de Tuiles 1", allLayer, 0, 0);
      const layer3 = map.createLayer("Calque de Tuiles 3", allLayer, 0, 0);
      const layer2 = map.createLayer("Calque de Tuiles 2", allLayer, 0, 0);

      console.info(layer1, layer2, layer3);
    }

    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game;
