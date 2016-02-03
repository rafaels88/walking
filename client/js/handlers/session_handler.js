var SessionHandler = SessionHandler || function(){
  this.connectedPlayers = {};
}

SessionHandler.prototype.addPlayer = function(player){
  this.connectedPlayers[player.id] = player;
}

SessionHandler.prototype.playerById = function(id){
  return this.connectedPlayers[id];
}

SessionHandler.prototype.removePlayer = function(id){
  this.connectedPlayers[id].kill();
  delete this.connectedPlayers[id];
}
