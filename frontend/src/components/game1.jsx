/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import { useEffect } from "react";
import Phaser from "phaser";
import firstmap from "../assets/TileMaps/Firstmap.json";
import anthony from "../assets/Tiles/Puny-Characters/Puny-Characters/Character-Base.png";
import RPG12 from "../assets/Tiles/RPG 12x12/First Asset pack.png";
import Chest from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f0.png";
import ChestOpen from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/frames/chest_empty_open_anim_f2.png";
import orc from "../assets/Tiles/Puny-Characters/Puny-Characters/Orc-Soldier-Cyan.png";

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
      this.load.spritesheet("anthony", anthony, {
        frameWidth: 32,
        frameHeight: 32,
      });
      this.load.image("chest", Chest);
      this.load.image("chest_open", ChestOpen);
      this.load.spritesheet("orc", orc, {
        frameWidth: 32,
        frameHeight: 32,
      });
    }
    const game = new Phaser.Game(gameConfig);
    // let platforms;
    let player;
    let chest;
    let ennemi;
    let allEnnemi;
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
      this.anims.create({
        key: "death",
        frames: this.anims.generateFrameNumbers("anthony", {
          start: 18,
          end: 23,
        }),
        frameRate: 25,
        repeat: -1,
      });

      // AJOUT D'UN ENNEMI
      allEnnemi = this.physics.add.group({
        immovable: false,
        key: "orc",
        repeat: 6,
      });
      ennemi = this.physics.add.sprite(10, 100, "orc");
      ennemi.setCollideWorldBounds(true);

      // DEPLACEMENT DE L'ENNEMI

      this.anims.create({
        key: "ennemi_left",
        frames: this.anims.generateFrameNumbers("orc", {
          start: 145,
          end: 148,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "ennemi_turn",
        frames: [{ key: "orc", frame: 1 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "ennemi_right",
        frames: this.anims.generateFrameNumbers("orc", {
          start: 48,
          end: 51,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "ennemi_up",
        frames: this.anims.generateFrameNumbers("orc", {
          start: 97,
          end: 99,
        }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "ennemi_down",
        frames: this.anims.generateFrameNumbers("orc", {
          start: 1,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      allEnnemi.add(ennemi);

      water.setCollisionBetween(368, 428);
      tree.setCollisionBetween(257, 357);

      this.physics.add.collider(player, water);
      this.physics.add.collider(player, tree);

      function hitEnnemi() {
        this.physics.pause();
        player.anims.play("death");
        player.setTint(0xff0000);
        gameOver = "gameOver";
        alert(gameOver);
      }

      function win() {
        setScore((prev) => prev + 1000);
        chest.setTexture("chest_open");
      }

      this.physics.add.collider(ennemi, player);
      this.physics.add.overlap(player, ennemi, hitEnnemi, null, this);

      this.physics.add.overlap(chest, player, win, null, this);

      // this.add.image(400, 300, "sky");
      // platforms = this.physics.add.staticGroup();
      // platforms.create(400, 568, "ground").setScale(2).refreshBody();
      // platforms.create(600, 400, "ground");
      // platforms.create(50, 250, "ground");
      // platforms.create(750, 220, "ground");
      // player = this.physics.add.sprite(100, 500, "dude");
      // player.setBounce(0.2);
      // player.setCollideWorldBounds(true);
      // this.anims.create({
      //   key: "left",
      //   frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      //   frameRate: 10,
      //   repeat: -1,
      // });
      // this.anims.create({
      //   key: "turn",
      //   frames: [{ key: "dude", frame: 4 }],
      //   frameRate: 20,
      // });
      // this.anims.create({
      //   key: "right",
      //   frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      //   frameRate: 10,
      //   repeat: -1,
      // });
      // this.physics.add.collider(player, platforms);
      // stars = this.physics.add.group({
      //   key: "star",
      //   repeat: 11,
      //   setXY: { x: 12, y: 0, stepX: 70 },
      // });
      // stars.children.iterate(function (child) {
      //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      // });
      // this.physics.add.collider(stars, platforms);
      // function collectStar() {
      //   star.disableBody(true, true);
      //   score += 10;
      //   scoreText.setText(`Score: ${score}`);
      //   if (stars.countActive(true) === 0) {
      //     stars.children.iterate(function (child) {
      //       child.enableBody(true, child.x, 0, true, true);
      //     });
      //     const x =
      //       player.x < 400
      //         ? Phaser.Math.Between(400, 800)
      //         : Phaser.Math.Between(0, 400);
      //     const bomb = bombs.create(x, 16, "bomb");
      //     bomb.setBounce(1);
      //     bomb.setCollideWorldBounds(true);
      //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      //   }
      // }
      // function hitBomb() {
      //   this.physics.pause();
      //   player.setTint(0xff0000);
      //   player.anims.play("turn");
      //   gameOver = true;
      // }
      // this.physics.add.overlap(player, stars, collectStar, null, this);
      // scoreText = this.add.text(16, 16, "score: 0", {
      //   fontSize: "32px",
      //   fill: "#000",
      // });
      // bombs = this.physics.add.group();
      // this.physics.add.collider(bombs, platforms);
      // this.physics.add.collider(player, bombs, hitBomb, null, this);
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

export default Game1;
