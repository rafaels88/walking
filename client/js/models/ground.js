var Ground = function(){
}

Ground.prototype.turnOn = function(){
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  this.scale.setTo(2, 2);

  //  This stops it from falling away when you jump on it
  this.body.immovable = true;
}
