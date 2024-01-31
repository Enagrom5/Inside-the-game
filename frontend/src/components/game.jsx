/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
import { useEffect } from "react";
import Phaser from "phaser";
import firstmap from "../assets/TileMaps/Firstmap.json";
// import dungeon from "../assets/Tiles/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6.png";
import RPG12 from "../assets/Tiles/RPG 12x12/First Asset pack.png";

function Game() {
  useEffect(() => {
    const gameConfig = {
      type: Phaser.AUTO,
      width: 240,
      height: 240,
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
      this.load.image("First Asset pack", RPG12);
      this.load.tilemapTiledJSON("map", firstmap);
    }
    const game = new Phaser.Game(gameConfig);
    // let platforms;
    // let player;
    // let stars;
    // let score = 0;
    // let scoreText;
    // let gameOver = false;
    // let bombs;

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 12,
        tileHeight: 12,
      });
      const land = map.addTilesetImage("Land", "First Asset pack");

      const water = map.createLayer("eau", land, 0, 0);
      const earth = map.createLayer("terre", land, 0, 0);
      const boat = map.createLayer("bateau", land, 0, 0);
      const tree = map.createLayer("Calque de Tuiles 5", land, 0, 0);
      const rest = map.createLayer("Calque de Tuiles 4", land, 0, 0);
      console.info(water, earth, boat, tree, rest);

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

    // let cursors;
    // function update() {
    //   cursors = this.input.keyboard.createCursorKeys();
    //   if (cursors.left.isDown) {
    //     player.setVelocityX(-160);

    //     player.anims.play("left", true);
    //   } else if (cursors.right.isDown) {
    //     player.setVelocityX(160);

    //     player.anims.play("right", true);
    //   } else {
    //     player.setVelocityX(0);

    //     player.anims.play("turn");
    //   }

    //   if (cursors.up.isDown && player.body.touching.down) {
    //     player.setVelocityY(-330);
    //   }
    // }
    return () => {
      game.destroy(true);
    };
  }, []);
  return <div id="phaserContainer">{/** le contenu du jeu type sprite */}</div>;
}

export default Game;
