var ScenarioBuilder = function(game){
  this.game = game;
}

ScenarioBuilder.prototype.preparePhysics = function(){
  this.platforms = this.game.add.group();
  this.platforms.enableBody = true;
}

ScenarioBuilder.prototype.createGround = function(){
  var uiGround = this.platforms.create(0, this.game.world.height - 64, 'ground');
  var obj = _.extend(uiGround, new Ground());
  obj.turnOn();
  return obj;
}

ScenarioBuilder.prototype.createLedge = function(position){
  var uiLedge = this.platforms.create(position.x, position.y, 'ground');
  var obj = _.extend(uiLedge, new Ledge());
  obj.turnOn();
  return obj;
}

ScenarioBuilder.prototype.createSky = function(){
  this.game.add.sprite(0, 0, 'sky');
  var obj = new Sky();
  obj.turnOn();
  return obj;
}
