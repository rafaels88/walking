var Game = Game || function(params){
  this.phaserGame = undefined;
  this.connectedPlayers = {};
  this.joystick = undefined;
  this.currentPlayer = undefined;
  this.lastCurrentPlayerPositionNotified = undefined;
  this.serverService = new ServerService();
  this.scenarioBuilder = undefined;
  this.playerBuilder = undefined;
  this.resolution = params.resolution;
  this.DOMContainerId = params.containerId;
}

Game.prototype.run = function(){
  var self = this;
  this.phaserGame = new Phaser.Game(this.resolution.x, this.resolution.y,
                                    Phaser.AUTO, this.DOMContainerId,
                                    {
                                      preload: function(){ self.preload() },
                                      create: function(){ self.create() },
                                      update: function(){ self.update() },
                                    });
  this.scenarioBuilder = new ScenarioBuilder(this.phaserGame);
  this.playerBuilder = new PlayerBuilder(this.phaserGame);
}

Game.prototype.preload = function(){
  this.phaserGame.load.image('sky', '/static/assets/sky.png');
  this.phaserGame.load.image('ground', '/static/assets/platform.png');
  this.phaserGame.load.image('star', '/static/assets/star.png');
  this.phaserGame.load.spritesheet('dude', '/static/assets/dude.png', 32, 48);
}

Game.prototype.create = function(){
  var self = this;
  //  We're going to be using physics, so enable the Arcade Physics system
  this.phaserGame.stage.disableVisibilityChange = true;
  this.phaserGame.physics.startSystem(Phaser.Physics.ARCADE);

  this.scenarioBuilder.preparePhysics();
  this.scenarioBuilder.createSky().turnOn();
  this.scenarioBuilder.createGround().turnOn();
  this.currentPlayer = this.createPlayer({x: 102, y: this.phaserGame.world.height - 150});

  this.joystick = this.phaserGame.input.keyboard.createCursorKeys();

  this.serverService.openConnection();
  this.serverService.onNewPlayer(function(data){self.listenNewPlayer(data)});
  this.serverService.onPlayerListRefresh(function(data){self.listenPlayersList(data)});
  this.serverService.onPlayerChangePosition(function(data){self.listenPlayerChangePosition(data)});
  this.serverService.onPlayerDisconnect(function(data){self.listenPlayerDisconnect(data)});
  this.serverService.notifyNewPlayer(this.currentPlayer);
}

Game.prototype.update = function(){
  for (var id in this.connectedPlayers){
    this.connectedPlayers[id].resetVelocity();
  }

  if(this.joystick.left.isDown){
    this.currentPlayer.moveLeft()
  } else if(this.joystick.right.isDown){
    this.currentPlayer.moveRight()
  } else if(this.joystick.up.isDown){
    this.currentPlayer.jump();
  } else {
    this.currentPlayer.stop();
  }

  this.notifyCurrentPlayerChangePosition();
}

Game.prototype.killPlayer = function(id){
  this.connectedPlayers[id].kill();
  delete this.connectedPlayers[id];
}

Game.prototype.createPlayer = function(params){
  var player = this.playerBuilder.create({x: params.x, y: params.y, id: params.id, frame: params.frame})
  player.turnOn();
  this.connectedPlayers[player.id] = player;
  return player;
}

Game.prototype.notifyCurrentPlayerChangePosition = function(){
  var currentPlayerPositionValue = this.currentPlayer.currentState();

  if(JSON.stringify(this.lastCurrentPlayerPositionNotified) !== JSON.stringify(currentPlayerPositionValue)){
    this.lastCurrentPlayerPositionNotified = currentPlayerPositionValue;
    this.serverService.notifyPlayerChangePosition(this.currentPlayer);
  }
}

Game.prototype.listenPlayerChangePosition = function(params){
  if(params.id != this.currentPlayer.id){
    var player = this.connectedPlayers[params.id];
    player.changePosition(params);
  }
}

Game.prototype.listenPlayerDisconnect = function(id){
  this.killPlayer(id);
}

Game.prototype.listenNewPlayer = function(params){
  if(!this.connectedPlayers[params.id]){
    this.createPlayer(params);
  }
}

Game.prototype.listenPlayersList = function(players){
  for(var i=0; i < players.length; i++){
    var newPlayerParams = players[i];

    if(newPlayerParams.id != this.currentPlayer.id){
      this.createPlayer(newPlayerParams);
    }
  }
}
