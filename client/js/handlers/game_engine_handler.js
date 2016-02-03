var GameEngineHandler = GameEngineHandler || function(params){
  this.engine = undefined;
  this.listener = params.listener;
  this.resolution = params.resolution;
  this.DOMContainerId = params.DOMContainerId;
}

GameEngineHandler.prototype.createGame = function(){
  var self = this;

  this.engine = new Phaser.Game(this.resolution.x, this.resolution.y,
                                Phaser.AUTO, this.DOMContainerId,
                                {
                                  preload: function(){ self.listener.preload() },
                                  create: function(){ self.listener.create() },
                                  update: function(){ self.listener.update() },
                                });
}

GameEngineHandler.prototype.loadAssets = function(){
  this.engine.load.image('sky', '/static/assets/sky.png');
  this.engine.load.image('ground', '/static/assets/platform.png');
  this.engine.load.image('star', '/static/assets/star.png');
  this.engine.load.spritesheet('dude', '/static/assets/dude.png', 32, 48);
}

GameEngineHandler.prototype.loadPhysics = function(){
  this.engine.stage.disableVisibilityChange = true;
  this.engine.physics.startSystem(Phaser.Physics.ARCADE);
}

GameEngineHandler.prototype.worldHeight = function(){
  this.engine.world.height;
}

GameEngineHandler.prototype.createCursor = function(){
  return this.engine.input.keyboard.createCursorKeys();
}
