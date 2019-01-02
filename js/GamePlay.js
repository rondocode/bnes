
const gamePlayState = new Phaser.Class({
  // Define scene
  Extends: Phaser.Scene,
  initialize:
  function GamePlay(){
      Phaser.Scene.call(this, {key: 'GamePlay'});
  },
  preload: gamePlayPreload,
  create: gamePlayCreate,
  update: gamePlayUpdate
})

// Add scene to list of scenes
myGame.scenes.push(gamePlayState);

function gamePlayPreload() {
  this.load.spritesheet('general', 'assets/sprites/general.png', { frameWidth: 16, frameHeight: 16 })
  //this.load.tilemapTiledJSON('map', 'assets/maps/map.json')
  //this.load.image('tiles', 'assets/maps/playfield.png')
}

function gamePlayCreate() {
  player = this.physics.add.sprite(100, 100, 'general')

  this.anims.create({
    key: 'wait',
    frames: this.anims.generateFrameNumbers('general', { frames: [1,9] }),
    repeat: -1,
    frameRate: myGame.frameRate
  })
  
  this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('general', { start: 0, end: 2 }),
      repeat: -1,
      frameRate: myGame.frameRate
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('general', { start: 3, end: 5 }),
    repeat: -1,
    frameRate: myGame.frameRate
  })

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('general', { start: 6, end: 8 }),
    repeat: -1,
    frameRate: myGame.frameRate
  })

  player.setCollideWorldBounds(true)
  cursors = this.input.keyboard.createCursorKeys()
}


function gamePlayUpdate() {
  
  player.setVelocity(0,0)

  if (cursors.left.isDown) {
    player.setVelocityX(-80)
    player.flipX = true
    player.anims.play('right', true)
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(80);
    player.flipX = false
    player.anims.play('right', true);
  }
  else if (cursors.up.isDown) {
    player.setVelocityY(-80)
    player.anims.play('up', true);
  }
  else if (cursors.down.isDown) {
    player.setVelocityY(80)
    player.anims.play('down', true);
  }
  else {
    player.anims.play('wait', true)
  }

}