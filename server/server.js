var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http, {pingInterval: 600000});



app.use(express.static(__dirname + '/../public'));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
//global list of all currently connected clients
var clients = [];

//Define the room object for easier room data management
function Room(roomName) {
    this.roomName = roomName;
    this.roomSize = 0;
    this.roomClients = [];
    this.readyStates = [];
    this.hasBegun = false;
}
//Room toString
Room.prototype.toString = function roomToString() {
    return this.roomName;
};
//array of four instances of rooms
var rooms =[new Room('room1'),new Room('room2'), new Room('room3'), new Room('room4')];

io.on('connection', function(socket){

    socket.on('register', function(clientInfo) {
      clients[socket.id] = clientInfo;
      console.log(clients[socket.id]);
    });

  socket.on('roomsRequest', function() {
      socket.emit('roomInfo', rooms);
  });

  socket.on('joinRoom', function(roomToJoin) {
      console.log(roomToJoin);
      if((roomToJoin.hasJoinedRoom === 'false')
          && rooms[roomToJoin.roomIndex].roomSize < 4
          && !rooms[roomToJoin.roomIndex].hasBegun) {
              console.log('in if')
              socket.join(rooms[roomToJoin.roomIndex].roomName); //get the string name of a room and join it
              rooms[roomToJoin.roomIndex].roomSize += 1; //increase the size of that room
              rooms[roomToJoin.roomIndex].roomClients.push(socket.id); //set client object in the room
              socket.emit('joinedRoom');
      }
      console.log(rooms);
  });

  socket.on('clientReady', function() {
      clients[socket.id].isReady = true;
      console.log(clients[socket.id]);
  });

  socket.on('clientNotReady', function() {
      clients[socket.id].isReady = false;
      console.log(clients[socket.id]);
  });

  function initGame() {
      for(var i = 0; i < rooms.length; i++) {
          rooms[i].readyStates = [];
          for(var j = 0; j < rooms[i].roomClients.length; j++) {
              if(clients[rooms[i].roomClients[j]] !== undefined && clients[rooms[i].roomClients[j]].isReady) {
                  rooms[i].readyStates.push(true);
              }
          }
          for(var isReady in rooms[i].readyStates) {
              var allReady = true;
              if(!isReady)
                  allReady = false;
          }
          if(allReady) {
              io.in(rooms[i].roomName).emit('initGame');
              rooms[i].hasBegun = true;
          }
      }
  }

  setInterval(function() {
      initGame();
  }, 1000);

  socket.on('disconnect', function(){
      //remove the client from their room if they are in one
      for(var i = 0; i < rooms.length; i++) {
          for(var j = 0; j < rooms[i].roomClients.length; j++) {
              if(rooms[i].roomClients[j] === socket.id) { //if it breaks, this is why
                  delete rooms[i].roomClients[j];
                  rooms[i].roomSize--;
                  break;
              }
          }
      }
      //remove the socket from the global list
      delete clients[socket.id];
      console.log(socket.id + ' disconnected');
  });
});


http.listen(3000,function() {
	console.log('listening on ' + 3000);
});