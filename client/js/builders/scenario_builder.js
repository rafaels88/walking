var ScenarioBuilder = function(game){
  this.game = game;
}

ScenarioBuilder.prototype.preparePhysics = function(){
  this.platforms = this.game.add.group();
  this.platforms.enableBody = true;
}

ScenarioBuilder.prototype.createGround = function(){
  var uiGround = this.platforms.create(0, this.game.world.height - 64, 'ground');
  return _.extend(uiGround, new Ground());
}

ScenarioBuilder.prototype.createLedge = function(position){
  var uiLedge = this.platforms.create(position.x, position.y, 'ground');
  return _.extend(uiLedge, new Ledge());
}

ScenarioBuilder.prototype.createSky = function(){
  this.game.add.sprite(0, 0, 'sky');
  return new Sky();
}
