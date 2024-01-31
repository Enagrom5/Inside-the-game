/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import { useEffect } from "react";
import Phaser from "phaser";
import thirdmap from "../assets/TileMaps/thirdmap.json";
import grass from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXTilesetGrass.png";
import stone from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXTilesetStoneGround.png";
import plant from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXPlant.png";
import props from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXProps.png";
import struct from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXStruct.png";
import wall from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXTilesetWall.png";
import shadow from "../assets/Tiles/Pixel Art Top Down - Basic/Texture/TXShadow.png";

function Game3() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 70,
      height: 640,
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
      this.load.image("TX Tileset Grass", grass);
      this.load.image("TX Tileset Stone Ground", stone);
      this.load.image("TX Tileset Plant", plant);
      this.load.image("TX Props", props);
      this.load.image("TX Struct", struct);
      this.load.image("TX Tileset Wall", wall);
      this.load.image("TX Shadow", shadow);

      this.load.tilemapTiledJSON("map", thirdmap);
    }
    const game = new Phaser.Game(gameConfig);

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 32,
        tileHeight: 32,
      });

      const land = map.addTilesetImage("TX Tileset Grass", "TX Tileset Grass");
      const ground = map.addTilesetImage(
        "TX Tileset Stone Ground",
        "TX Tileset Stone Ground"
      );
      const Plant = map.addTilesetImage("TX Tileset Plant", "TX Tileset Plant");
      const Props = map.addTilesetImage("TX Props", "TX Props");
      const Struc = map.addTilesetImage("TX Struct", "TX Struct");
      const Wall = map.addTilesetImage("TX Tileset Wall", "TX Tileset Wall");
      const Shadow = map.addTilesetImage("TX Shadow", "TX Shadow");

      const allLayer = [land, ground, Plant, Props, Struc, Wall, Shadow];

      const sol = map.createLayer("Calque de Tuiles 1", allLayer, 0, 0);
      const ombre = map.createLayer("ombre", allLayer, 0, 0);
      const mur = map.createLayer("Calque de Tuiles 2", allLayer, 0, 0);
      const statut = map.createLayer("Calque de Tuiles 3", allLayer, 0, 0);
      console.info(sol, ombre, mur, statut);
    }

    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game3;
