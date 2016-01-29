var PlayerBuilder = function(game){
  this.game = game;
}
PlayerBuilder.prototype.create = function(opts){
  var uiPlayer = this.game.add.sprite(opts.x, opts.y, 'dude');
  this.game.physics.arcade.enable(uiPlayer);
  return _.extend(uiPlayer, new Player({id: opts.id}))
}
