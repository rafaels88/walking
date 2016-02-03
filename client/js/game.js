var Game = Game || function(params){
  this.joystick = undefined;
  this.currentPlayer = undefined;
  this.sessionHandler = new SessionHandler();
  this.gameEngineHandler = new GameEngineHandler({ listener: this, resolution: params.resolution, DOMContainerId: params.DOMContainerId });
  this.notificationsHandler = new NotificationsHandler({ sessionHandler: this.sessionHandler, currentPlayer: this.currentPlayer, game: this });
  this.scenarioBuilder = undefined;
  this.playerBuilder = undefined;
}

Game.prototype.run = function(){
  this.gameEngineHandler.createGame();
  this.scenarioBuilder = new ScenarioBuilder(this.gameEngineHandler.engine);
  this.playerBuilder = new PlayerBuilder(this.gameEngineHandler.engine);
}

Game.prototype.preload = function(){
  this.gameEngineHandler.loadAssets();
}

Game.prototype.create = function(){
  this.gameEngineHandler.loadPhysics();

  this.scenarioBuilder.preparePhysics();
  this.scenarioBuilder.createSky();
  this.scenarioBuilder.createGround();
  this.currentPlayer = this.createPlayer({x: 102, y: this.gameEngineHandler.worldHeight() - 150});
  this.joystick = new JoystickHandler(this.gameEngineHandler, this.currentPlayer);

  this.notificationsHandler.listen();
}

Game.prototype.update = function(){
  this.currentPlayer.resetVelocity();
  this.joystick.listenInputs();
  this.notificationsHandler.notifyCurrentPlayerChangePosition();
}

Game.prototype.createPlayer = function(params){
  var player = this.playerBuilder.create({x: params.x, y: params.y, id: params.id, frame: params.frame})
  this.sessionHandler.addPlayer(player);
  return player;
}
