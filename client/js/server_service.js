var ServerService = ServerService || function(){
  this.server = undefined;
}

ServerService.prototype.openConnection = function(){
  this.server = io();
}

ServerService.prototype.onNewPlayer = function(cb){
  this.server.on('player.new', cb);
}

ServerService.prototype.onPlayerListRefresh = function(cb){
  this.server.on('players.list', cb);
}

ServerService.prototype.onPlayerChangePosition = function(cb){
  this.server.on('player.changePosition', cb);
}

ServerService.prototype.onPlayerDisconnect = function(cb){
  this.server.on('player.disconnect', cb);
}

ServerService.prototype.onNewPlayer = function(cb){
  this.server.on('player.new', cb);
}

ServerService.prototype.notifyNewPlayer = function(player){
  this.server.emit('player.new', player.currentState());
}

ServerService.prototype.notifyPlayerChangePosition = function(player){
  this.server.emit('player.changePosition', player.currentState());
}
