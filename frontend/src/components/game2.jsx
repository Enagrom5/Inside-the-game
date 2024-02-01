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
import anthony from "../assets/Tiles/Puny-Characters/Puny-Characters/Character-Base.png";

function Game2() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 330,
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
        update: update,
      },
    };
    function preload() {
      this.load.image("Background", Background);
      this.load.image("Tiles", Tiles);
      this.load.image("Rocks", Rocks);
      this.load.image("Trees", Trees);
      this.load.image("champ", champ);
      this.load.spritesheet("anthony", anthony, {
        frameWidth: 32,
        frameHeight: 32,
      });
      this.load.tilemapTiledJSON("map", secondmap);
    }
    const game = new Phaser.Game(gameConfig);
    // let platforms;
    let player;
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

      const back = map.createLayer("background", allLayer, 0, 0);
      const arbres = map.createLayer("arbres", allLayer, 0, 0);
      const water = map.createLayer("0", allLayer, 0, 0);
      const forest = map.createLayer("1", allLayer, 0, 0);

      console.info(water, back, arbres, forest);
      player = this.physics.add.sprite(10, 250, "anthony");
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

export default Game2;
