var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var playersConnected = {};

function playersIdConnected(){
  var ids = [];
  for(var socketId in playersConnected){
    ids.push(playersConnected[socketId]['id']);
  }
  return ids;
}
function addNewPlayer(socket, playerId, x, y){
  playersConnected[socket.id] = { id: playerId, x: x, y: y };
}
function removePlayer(socket){
  var playerId = playersConnected[socket.id]['id'];
  delete playersConnected[socket.id];
  return playerId;
}
function changePlayerPosition(socket, x, y){
  playersConnected[socket.id]['x'] = x;
  playersConnected[socket.id]['y'] = y;
}

io.on('connection', function(socket){
  socket.emit('players.list', playersIdConnected());

  socket.on('player.new', function(params){
    addNewPlayer(socket, params.playerId, params.x, params.y);
    socket.broadcast.emit('player.new', params);
  });

  socket.on('player.changePosition', function(params){
    //socket.emit('player.moveLeft', playerId);
    changePlayerPosition(socket, params.x, params.y);
    socket.broadcast.emit('player.changePosition', params);
  });

  socket.on('player.moveLeft', function(playerId){
    socket.emit('player.moveLeft', playerId);
    socket.broadcast.emit('player.moveLeft', playerId);
  });

  socket.on('player.moveRight', function(playerId){
    socket.emit('player.moveRight', playerId);
    socket.broadcast.emit('player.moveRight', playerId);
  });

  socket.on('player.moveJump', function(playerId){
    socket.emit('player.moveJump', playerId);
    socket.broadcast.emit('player.moveJump', playerId);
  });

  socket.on("disconnect", function(){
    var playerIdDisconnected = removePlayer(socket);
    socket.broadcast.emit('player.disconnect', playerIdDisconnected);
  });
});





app.use('/static', express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
