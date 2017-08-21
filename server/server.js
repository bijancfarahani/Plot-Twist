var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http, {pingInterval: 100000});



app.use(express.static(__dirname + '/../public'));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
//global list of all currently connected clients
var sockets = [];

//Define the room object for easier room data management
function Room(roomName) {
    this.roomName = roomName;
    this.roomSize = 0;
    this.roomClients = [];
}
Room.prototype.toString = function roomToString() {
    return this.roomName;
}
//array of four instances of rooms
var rooms =[new Room('room1'),new Room('room2'), new Room('room3'), new Room('room4')];

io.on('connection', function(socket){
  socket.on('register', function(clientInfo) {
    if(clientInfo) {
        console.log('there is client info')
        sockets[socket.id] = clientInfo;
    }
    else {
        console.log('there is no client info');
    }
  });

  socket.on('roomsRequest', function() {
      socket.emit('roomInfo', rooms);
  });

  socket.on('joinRoom', function(roomToJoin) {
      console.log(roomToJoin);
    if((roomToJoin.hasJoinedRoom == 'false')) {
        console.log('in if');
      socket.join(rooms[roomToJoin.roomIndex].roomName);
      rooms[roomToJoin.roomIndex].roomSize += 1;
      sockets[socket.id].inRoom = true;
      rooms[roomToJoin.roomIndex].roomClients.push(sockets[socket.id]);
      socket.emit('joinedRoom');
    }
    console.log(rooms);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('disconnect', function(){
      console.log(socket.id + ' disconnected');
  });
});

http.listen(3000,function() {
	console.log('listening on ' + 3000);
});