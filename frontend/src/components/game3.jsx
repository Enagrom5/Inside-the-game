/* eslint-disable react/prop-types */
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
import face from "../assets/Tiles/Puny-Characters/Puny-Characters/charater_face.png";
import Chest from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f0.png";
import ChestOpen from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f2.png";

function Game3({ setScore }) {
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
      this.load.spritesheet("anthoface", face, {
        frameWidth: 16,
        frameHeight: 16,
      });
      this.load.image("chest", Chest);
      this.load.image("chest_open", ChestOpen);
      this.load.tilemapTiledJSON("map", thirdmap);
    }
    const game = new Phaser.Game(gameConfig);

    let player;
    let chest;
    // let gameOver = false;

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

      chest = this.physics.add.staticGroup();
      chest.create(208, 110, "chest");

      player = this.physics.add.sprite(540, 800, "anthoface");
      player.setCollideWorldBounds(true);
      // AJOUT DE SES DEPLACEMENTS

      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 24,
          end: 27,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "anthoface", frame: 1 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 8,
          end: 11,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 16,
          end: 19,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 1,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_down",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 4,
          end: 7,
        }),
        frameRate: 25,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_up",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 20,
          end: 23,
        }),
        frameRate: 25,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_left",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 28,
          end: 31,
        }),
        frameRate: 25,
        repeat: -1,
      });
      this.anims.create({
        key: "attack_right",
        frames: this.anims.generateFrameNumbers("anthoface", {
          start: 12,
          end: 15,
        }),
        frameRate: 25,
        repeat: -1,
      });

      // function hitEnnemi() {
      //   this.physics.pause();
      //   player.anims.play("turn");
      //   player.setTint(0xff0000);
      //   gameOver = "gameOver";
      //   alert(gameOver);
      // }

      function win() {
        setScore((prev) => prev + 1000);
        this.physics.pause();
      }

      this.physics.add.overlap(chest, player, win, null, this);
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
