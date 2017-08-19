var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(morgan('dev'));

app.use(express.static(__dirname + '/../public'));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

var clients = [];
var sioRoom = io.sockets.adapter.rooms[roomToJoin.room];
if(sioRoom) {
    Object.keys(sioRoom.sockets).forEach( function(socketId){
        console.log("sioRoom client socket Id: " + socketId );
    });
    console.log(Object.keys(sioRoom.length));
}
var roomSize = {
    room1: 0,
    room2: 0,
    room3: 0,
    room4: 0};

io.on('connection', function(socket){
  console.log(socket.id + ' connected');
  clients.push(socket.id);
  socket.on('test', function(data) {
    console.log(data.message + ' received');
  });
  socket.on('clientInfo', function(clientInfo) {
      clients[socket.id] = clientInfo;
      console.log('clientInfo: ' + clients[socket.id].name);
      socket.emit('roomInfo',roomSize);

  });

  socket.on('joinRoom', function(roomToJoin) {
    if(roomSize[roomToJoin.room] < 4) {
      socket.join(roomToJoin.room);
      roomSize[roomToJoin.room] += 1;
    }
    console.log(roomSize);
  });

  socket.on('disconnect', function(){
    delete clients[socket.id];  //remove client from currently connected clients list
    console.log(socket.id + ' disconnected');

  });
});
    

http.listen(3000,function() {
	console.log('listening on ' + 3000);
})