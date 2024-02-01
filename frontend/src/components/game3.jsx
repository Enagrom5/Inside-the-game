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
import anthony from "../assets/Tiles/Puny-Characters/Puny-Characters/Character-Base.png";

function Game3() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 780,
      height: 640,
      physics: {
        default: "arcade",
      },
      parent: "phaserContainer",
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };
    function preload() {
      this.load.image("TX Tileset Grass", grass);
      this.load.image("TX Tileset Stone Ground", stone);
      this.load.image("TX Plant", plant);
      this.load.image("TX Props", props);
      this.load.image("TX Struct", struct);
      this.load.image("TX Tileset Wall", wall);
      this.load.image("TX Shadow", shadow);
      this.load.spritesheet("anthony", anthony, {
        frameWidth: 32,
        frameHeight: 32,
      });
      this.load.tilemapTiledJSON("map", thirdmap);
    }
    const game = new Phaser.Game(gameConfig);

    let player;

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 16,
        tileHeight: 16,
      });

      const land = map.addTilesetImage("TX Tileset Grass", "TX Tileset Grass");
      const ground = map.addTilesetImage(
        "TX Tileset Stone Ground",
        "TX Tileset Stone Ground"
      );
      const Plant = map.addTilesetImage("TX Plant", "TX Plant");
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

      player = this.physics.add.sprite(199, 100, "anthony");
      player.setCollideWorldBounds(true);
      // AJOUT DE SES DEPLACEMENTS

      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 145,
          end: 148,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "anthony", frame: 1 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 48,
          end: 51,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 97,
          end: 99,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 1,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_down",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 5,
          end: 7,
        }),
        frameRate: 25,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_up",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 102,
          end: 104,
        }),
        frameRate: 25,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_left",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 149,
          end: 151,
        }),
        frameRate: 25,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_right",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 53,
          end: 55,
        }),
        frameRate: 25,
        repeat: -1,
      });
    }

    let cursors;
    function update() {
      cursors = this.input.keyboard.createCursorKeys();
      if (cursors.shift.isDown && cursors.down.isDown) {
        player.anims.play("attack_down", true);
      } else if (cursors.shift.isDown && cursors.up.isDown) {
        player.anims.play("attack_up", true);
      } else if (cursors.shift.isDown && cursors.left.isDown) {
        player.anims.play("attack_left", true);
      } else if (cursors.shift.isDown && cursors.right.isDown) {
        player.anims.play("attack_right", true);
      } else if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.anims.play("right", true);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.anims.play("up", true);
      } else if (cursors.down.isDown) {
        player.setVelocityY(100);
        player.anims.play("down", true);
      } else if (cursors.shift.isDown) {
        player.anims.play("attack_down", true);
      } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play("turn");
      }
    }
    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game3;
