var JoystickHandler = JoystickHandler || function(engineHandler, player){
  this.player = player;
  this.cursor = engineHandler.createCursor();
  this.keyboard = engineHandler.keyboard();
}

JoystickHandler.prototype.listenInputs = function(){
  if(this.cursor.left.isDown){
    this.player.moveLeft()
  } else if(this.cursor.right.isDown){
    this.player.moveRight()
  } else if(this.cursor.up.isDown){
    this.player.jump();
  } else if(this.cursor.up.isDown){
    this.player.jump();
  } else {
    this.player.stop();
  }

  if(this.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    this.player.shoot();
  }
}
