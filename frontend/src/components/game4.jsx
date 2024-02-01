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
import anthony from "../assets/Tiles/Puny-Characters/Puny-Characters/Character-Base.png";

function Game() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 350,
      height: 320,
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
      this.load.image("Tileset_Water", water);
      this.load.image("Props", props);
      this.load.image("Trees_Bushes", tree);
      this.load.image("Tileset_Road", road);
      this.load.image("Tileset_Ground", grass);
      this.load.image("Rocks", rock);
      this.load.spritesheet("anthony", anthony, {
        frameWidth: 32,
        frameHeight: 32,
      });
      this.load.tilemapTiledJSON("map", fourmap);
    }
    const game = new Phaser.Game(gameConfig);
    let player;
    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 12,
        tileHeight: 12,
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
      player = this.physics.add.sprite(40, 0, "anthony");
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

export default Game;
