var JoystickHandler = JoystickHandler || function(engineHandler, player){
  this.player = player;
  this.cursor = engineHandler.createCursor();
}

JoystickHandler.prototype.listenInputs = function(){
  if(this.cursor.left.isDown){
    this.player.moveLeft()
  } else if(this.cursor.right.isDown){
    this.player.moveRight()
  } else if(this.cursor.up.isDown){
    this.player.jump();
  } else {
    this.player.stop();
  }
}
