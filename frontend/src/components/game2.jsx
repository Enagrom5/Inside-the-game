/* eslint-disable react/prop-types */
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
import face from "../assets/Tiles/Puny-Characters/Puny-Characters/charater_face.png";
import Chest from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f0.png";
import ChestOpen from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f2.png";

function Game2({ setScore }) {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 330,
      height: 320,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 1000 },
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
      this.load.spritesheet("anthoface", face, {
        frameWidth: 16,
        frameHeight: 16,
      });
      this.load.image("chest", Chest);
      this.load.image("chest_open", ChestOpen);
      this.load.tilemapTiledJSON("map", secondmap);
    }
    const game = new Phaser.Game(gameConfig);
    // let platforms;
    let player;
    let chest;
    // let gameOver = false;

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

      chest = this.physics.add.staticGroup();
      chest.create(300, 22, "chest");

      player = this.physics.add.sprite(20, 230, "anthoface");
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

      function win() {
        setScore((prev) => prev + 1000);
        this.physics.pause();
      }

      this.physics.add.overlap(chest, player, win, null, this);
      this.physics.add.collider(player, forest);
      this.physics.add.collider(player, water);

      forest.setCollisionBetween(25, 30);
      water.setCollisionBetween(25, 29);
      forest.setCollisionBetween(385, 388);
      water.setCollisionBetween(155, 157);
      forest.setCollisionBetween(155, 157);
      water.setCollisionBetween(385, 388);
      forest.setCollisionBetween(31, 55);
      forest.setCollisionBetween(285, 289);
    }
    let cursors;
    function update() {
      cursors = this.input.keyboard.createCursorKeys();

      if (cursors.space.isDown && cursors.up.isDown) {
        player.anims.play("up", true);
        player.setVelocityY(-130);
      } else if (cursors.space.isDown && cursors.left.isDown) {
        player.anims.play("left", true);
        player.setVelocityY(-130);
        player.setVelocityX(-160);
      } else if (cursors.space.isDown && cursors.right.isDown) {
        player.anims.play("right", true);
        player.setVelocityY(-130);
        player.setVelocityX(160);
      } else if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.anims.play("right", true);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.anims.play("up", true);
      } else {
        player.setVelocityX(0);
        player.setVelocityY(130);
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
