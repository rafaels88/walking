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
function addNewPlayer(socket, params){
  playersConnected[socket.id] = { id: params.playerId, x: params.x, y: params.y, frame: params.frame };
}
function removePlayer(socket){
  var playerId = playersConnected[socket.id]['id'];
  delete playersConnected[socket.id];
  return playerId;
}
function changePlayerPosition(socket, params){
  playersConnected[socket.id]['x'] = params.x;
  playersConnected[socket.id]['y'] = params.y;
  playersConnected[socket.id]['frame'] = params.frame;
}

io.on('connection', function(socket){
  socket.emit('players.list', playersIdConnected());

  socket.on('player.new', function(params){
    addNewPlayer(socket, params);
    socket.broadcast.emit('player.new', params);
  });

  socket.on('player.changePosition', function(params){
    changePlayerPosition(socket, params);
    socket.broadcast.emit('player.changePosition', params);
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
