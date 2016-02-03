var NotificationsHandler = NotificationsHandler || function(params){
  this.sessionHandler = params.sessionHandler;
  this.serverService = new ServerService();
  this.game = params.game;
  this.lastCurrentPlayerPositionNotified = undefined;
}

NotificationsHandler.prototype.listen = function(){
  var self = this;
  this.serverService.openConnection();
  this.serverService.onNewPlayer(function(data){self.listenNewPlayer(data)});
  this.serverService.onPlayerListRefresh(function(data){self.listenPlayersList(data)});
  this.serverService.onPlayerChangePosition(function(data){self.listenPlayerChangePosition(data)});
  this.serverService.onPlayerDisconnect(function(data){self.listenPlayerDisconnect(data)});
  this.serverService.notifyNewPlayer(this.game.currentPlayer);
}

NotificationsHandler.prototype.listenPlayerChangePosition = function(params){
  if(params.id != this.game.currentPlayer.id){
    var player = this.sessionHandler.playerById(params.id);
    player.changePosition(params);
  }
}

NotificationsHandler.prototype.listenPlayerDisconnect = function(id){
  this.sessionHandler.removePlayer(id);
}

NotificationsHandler.prototype.listenNewPlayer = function(params){
  if(!this.sessionHandler.playerById(params.id)){
    this.game.createPlayer(params);
  }
}

NotificationsHandler.prototype.listenPlayersList = function(players){
  for(var i=0; i < players.length; i++){
    var newPlayerParams = players[i];

    if(newPlayerParams.id != this.game.currentPlayer.id){
      this.game.createPlayer(newPlayerParams);
    }
  }
}

NotificationsHandler.prototype.notifyCurrentPlayerChangePosition = function(){
  var currentPlayerPositionValue = this.game.currentPlayer.currentState();

  if(JSON.stringify(this.lastCurrentPlayerPositionNotified) !== JSON.stringify(currentPlayerPositionValue)){
    this.lastCurrentPlayerPositionNotified = currentPlayerPositionValue;
    this.serverService.notifyPlayerChangePosition(this.game.currentPlayer);
  }
}
