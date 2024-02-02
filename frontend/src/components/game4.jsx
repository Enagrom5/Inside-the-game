/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import face from "../assets/Tiles/Puny-Characters/Puny-Characters/face.png";
import Chest from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f0.png";
import ChestOpen from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f2.png";

function Game({ setScore }) {
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
      this.load.spritesheet("anthoface", face, {
        frameWidth: 10,
        frameHeight: 9,
      });
      this.load.image("chest", Chest);
      this.load.image("chest_open", ChestOpen);
      this.load.tilemapTiledJSON("map", fourmap);
    }
    const game = new Phaser.Game(gameConfig);
    let player;
    let chest;
    let collision;
    // let gameOver = false;
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

      // eslint-disable-next-line no-unused-vars
      const layer1 = map.createLayer("Calque de Tuiles 1", allLayer, 0, 0);
      const layer3 = map.createLayer("Calque de Tuiles 3", allLayer, 0, 0);
      const layer2 = map.createLayer("Calque de Tuiles 2", allLayer, 0, 0);
      collision = map.getObjectLayer("collision");

      console.info(collision);

      chest = this.physics.add.staticGroup();
      chest.create(158, 158, "chest");

      player = this.physics.add.sprite(38, 5, "anthoface");
      player.setCollideWorldBounds(true);
      // AJOUT DE SES DEPLACEMENTS

      this.anims.create({
        key: "turn",
        frames: [{ key: "anthoface", frame: 0 }],
        frameRate: 20,
      });
    }
    let cursors;
    function update() {
      collision.objects.forEach((object) => {
        const rect = new Phaser.Geom.Rectangle(
          object.x,
          object.y,
          object.width,
          object.height
        );

        const zone = this.add
          .zone(rect.centerX, rect.centerY)
          .setSize(rect.width, rect.height);
        this.physics.add.existing(zone);

        this.physics.add.collider(player, zone, () => {});
      });
      cursors = this.input.keyboard.createCursorKeys();

      if (cursors.left.isDown) {
        player.setVelocityX(-45);
        player.anims.play("turn", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(45);
        player.anims.play("turn", true);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-45);
        player.anims.play("turn", true);
      } else if (cursors.down.isDown) {
        player.setVelocityY(45);
        player.anims.play("turn", true);
      } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play("turn");
      }

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
    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game;
