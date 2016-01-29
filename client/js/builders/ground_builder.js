var GroundBuilder = function(game){
  this.game = game;
}
GroundBuilder.prototype.create = function(platforms){
  var uiGround = platforms.create(0, this.game.world.height - 64, 'ground');
  return _.extend(uiGround, new Ground());
}
