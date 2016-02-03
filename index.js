var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var playersConnected = {};

function playersConnectedList(){
  var players = [];
  for(var socketId in playersConnected){
    players.push(playersConnected[socketId]);
  }
  return players;
}
function addNewPlayer(socket, params){
  playersConnected[socket.id] = params;
}
function removePlayer(socket){
  var player = playersConnected[socket.id];
  if(player){
    delete playersConnected[socket.id];
    return player.id;
  }
}
function changePlayerPosition(socket, params){
  playersConnected[socket.id]['x'] = params.x;
  playersConnected[socket.id]['y'] = params.y;
  playersConnected[socket.id]['frame'] = params.frame;
}

io.on('connection', function(socket){
  socket.emit('players.list', playersConnectedList());

  socket.on('player.new', function(params){
    addNewPlayer(socket, params);
    socket.broadcast.emit('player.new', params);
  });

  socket.on('player.changePosition', function(params){
    changePlayerPosition(socket, params);
    socket.broadcast.emit('player.changePosition', params);
  });

  socket.on("disconnect", function(){
    var idDisconnected = removePlayer(socket);
    if(idDisconnected){
      socket.broadcast.emit('player.disconnect', idDisconnected);
    }
  });
});




app.use('/static', express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
