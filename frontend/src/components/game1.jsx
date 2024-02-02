/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import { useEffect } from "react";
import Phaser from "phaser";
import firstmap from "../assets/TileMaps/Firstmap.json";
import face from "../assets/Tiles/Puny-Characters/Puny-Characters/charater_face.png";
import RPG12 from "../assets/Tiles/RPG 12x12/First Asset pack.png";
import Chest from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f0.png";
import ChestOpen from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f2.png";
import orc from "../assets/Tiles/Puny-Characters/Puny-Characters/orc.png";

function Game1({ setScore }) {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 240,
      height: 240,
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
      this.load.image("First Asset pack", RPG12);
      this.load.tilemapTiledJSON("map", firstmap);
      this.load.spritesheet("anthoface", face, {
        frameWidth: 16,
        frameHeight: 16,
      });

      this.load.image("chest", Chest);
      this.load.image("chest_open", ChestOpen);
      this.load.spritesheet("orc", orc, {
        frameWidth: 18,
        frameHeight: 24,
      });
    }
    const game = new Phaser.Game(gameConfig);
    // let platforms;
    let player;
    let ennemi;
    let allEnnemi;
    let chest;
    let gameOver = false;
    // let bombs;

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 16,
        tileHeight: 16,
      });
      const land = map.addTilesetImage("First Asset pack", "First Asset pack");
      const newland = map.addTilesetImage("Land", "First Asset pack");
      const allLayer = [land, newland];

      const water = map.createLayer("eau", allLayer, 0, 0);
      const earth = map.createLayer("terre", allLayer, 0, 0);
      const boat = map.createLayer("bateau", allLayer, 0, 0);
      const tree = map.createLayer("Calque de Tuiles 5", allLayer, 0, 0);
      const rest = map.createLayer("Calque de Tuiles 4", allLayer, 0, 0);
      console.info(earth, boat, rest);
      chest = this.physics.add.staticGroup();
      chest.create(75, 75, "chest");

      // CREATION DU JOUEUR

      player = this.physics.add.sprite(199, 100, "anthoface");
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

      // AJOUT D'UN ENNEMI
      allEnnemi = this.physics.add.group();

      const listOfEnnemi = [
        { x: 10, y: 30 },
        { x: 139, y: 48 },
        { x: 155, y: 122 },
        { x: 100, y: 150 },
        { x: 50, y: 180 },
        { x: 130, y: 20 },
      ];

      for (let i = 0; i < 6; i += 1) {
        ennemi = allEnnemi.create(listOfEnnemi[i].x, listOfEnnemi[i].y, "orc");
        ennemi.setCollideWorldBounds(true);
        this.physics.add.collider(ennemi, water);
        this.physics.add.collider(ennemi, ennemi);
      }

      // DEPLACEMENT DE L'ENNEMI avec animation mais pour le moment je n'arrivepas à la faire

      // this.anims.create({
      //   key: "ennemi_left",
      //   frames: this.anims.generateFrameNumbers("orc", {
      //     start: 10,
      //     end: 13,
      //   }),
      //   frameRate: 10,
      //   repeat: -1,
      // });

      // this.anims.create({
      //   key: "ennemi_turn",
      //   frames: [{ key: "orc", frame: 0 }],
      //   frameRate: 20,
      // });

      // this.anims.create({
      //   key: "ennemi_right",
      //   frames: this.anims.generateFrameNumbers("orc", {
      //     start: 4,
      //     end: 7,
      //   }),
      //   frameRate: 10,
      //   repeat: -1,
      // });
      // this.anims.create({
      //   key: "ennemi_up",
      //   frames: this.anims.generateFrameNumbers("orc", {
      //     start: 8,
      //     end: 11,
      //   }),
      //   frameRate: 10,
      //   repeat: -1,
      // });
      // this.anims.create({
      //   key: "ennemi_down",
      //   frames: this.anims.generateFrameNumbers("orc", {
      //     start: 0,
      //     end: 3,
      //   }),
      //   frameRate: 10,
      //   repeat: -1,
      // });

      water.setCollisionBetween(368, 428);
      tree.setCollisionBetween(257, 357);

      this.physics.add.collider(player, water);

      function win() {
        setScore((prev) => prev + 1000);
        this.physics.pause();
      }

      this.physics.add.overlap(chest, player, win, null, this);
      function hitEnnemi() {
        this.physics.pause();
        player.anims.play("turn");
        player.setTint(0xff0000);
        gameOver = "gameOver";
        alert(gameOver);
      }
      this.physics.add.overlap(player, allEnnemi, hitEnnemi, null, this);
    }

    let cursors;
    function update() {
      cursors = this.input.keyboard.createCursorKeys();

      if (cursors.shift.isDown && cursors.down.isDown) {
        player.anims.play("attack_down", true);
        this.physics.add.overlap(
          player,
          allEnnemi,

          null,
          this
        );
      } else if (cursors.shift.isDown && cursors.up.isDown) {
        player.anims.play("attack_up", true);
        this.physics.add.overlap(
          player,
          allEnnemi,

          null,
          this
        );
      } else if (cursors.shift.isDown && cursors.left.isDown) {
        player.anims.play("attack_left", true);
        this.physics.add.overlap(
          player,
          allEnnemi,

          null,
          this
        );
      } else if (cursors.shift.isDown && cursors.right.isDown) {
        player.anims.play("attack_right", true);
        this.physics.add.overlap(
          player,
          allEnnemi,

          null,
          this
        );
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

        const random = Math.round(Math.random());
        const acceleration = 10;
        allEnnemi.children.iterate(function (child) {
          const vitesseX = Phaser.Math.Between(-100, 100); // Vitesse horizontale aléatoire
          const vitesseY = Phaser.Math.Between(-100, 100); // Vitesse verticale aléatoire
          if (random === 0) {
            child.body.velocity.x < vitesseX
              ? (child.body.velocity.x += acceleration)
              : (child.body.velocity.x -= acceleration);
          } else {
            child.body.velocity.y < vitesseY
              ? (child.body.velocity.y += acceleration)
              : (child.body.velocity.y -= acceleration);
          }
        });
      }
    }
    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game1;
