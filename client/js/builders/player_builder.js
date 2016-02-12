var PlayerBuilder = function(game){
  this.game = game;
}

PlayerBuilder.prototype.create = function(opts){
  var uiPlayer = this.game.add.sprite(opts.x, opts.y, 'dude');

  if(opts.frame){ uiPlayer.frame = opts.frame; }
  this.game.physics.arcade.enable(uiPlayer);

  var player = _.extend(uiPlayer, new Player({id: opts.id}))
  player.turnOn();

  var gun = this._createGun();
  player.addGun(gun);

  return player;
}

PlayerBuilder.prototype._createGun = function(){
  var gun = new Gun(this.game);
  gun.turnOn();

  var bullets = this._createBullets();
  gun.addBullets(bullets);
  return gun;
}

PlayerBuilder.prototype._createBullets = function(){
  var bullets = this.game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  bullets.createMultiple(50, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);

  return bullets;
}
