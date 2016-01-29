var Player = function(opts){
  this.id = opts.id || _.uniqueId('id_') + Math.random() * 10;
  this.enemy = opts.enemy;
}

Player.prototype.turnOn = function(){
  //  Player physics properties. Give the little guy a slight bounce.
  this.body.bounce.y = 0.2;
  this.body.gravity.y = 300;
  this.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  this.animations.add('left', [0, 1, 2, 3], 10, true);
  this.animations.add('right', [5, 6, 7, 8], 10, true);

  if(this.enemy === true){
    this.body.moves = false;
  }
}

Player.prototype.resetVelocity = function(){
  this.body.velocity.x = 0;
}

Player.prototype.moveLeft = function(){
  this.body.velocity.x = -150;
  this.animations.play('left');
}

Player.prototype.moveRight = function(){
  this.body.velocity.x = 150;
  this.animations.play('right');
}

Player.prototype.stop = function(){
  this.animations.stop();
  this.frame = 4;
}

Player.prototype.jump = function(){
  this.body.velocity.y = -250;
}

Player.prototype.kill = function(){
  this.destroy(true);
}

Player.prototype.changePosition = function(params){
  this.x = params.x;
  this.y = params.y;
}
