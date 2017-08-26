var express = require('express');
var app = express();
var path = require('path');
var deck = require('./deckManager');
var http = require('http').Server(app);
var io = require('socket.io')(http, {pingInterval: 600000});



app.use(express.static(__dirname + '/../public'));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
//global list of all currently connected clients
function Client(clientInfo) {
    for (var fld in clientInfo) {
        this[fld] = clientInfo[fld];
    }
    this.playerNo = null;
}
Client.prototype.toString = function clientToString() {
    return this.userName + this.userID;
}
var clients = [];

//Define the room object for easier room data management
function Room(roomName) {
    this.roomName = roomName;
    this.roomSize = 0;
    this.roomClients = [];
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
        clients[socket.id] = new Client(clientInfo);
    });

    //rewrite this to be better later
  socket.on('roomsRequest', function() {
      socket.emit('roomInfo', rooms);
  });

  socket.on('joinRoom', function(roomToJoin) {
      if((roomToJoin.hasJoinedRoom === 'false')
          && rooms[roomToJoin.roomIndex].roomSize < 4
          && !rooms[roomToJoin.roomIndex].hasBegun) {
              socket.join(rooms[roomToJoin.roomIndex].roomName); //get the string name of a room and join it
              rooms[roomToJoin.roomIndex].roomSize += 1; //increase the size of that room
              clients[socket.id].playerNo = (rooms[roomToJoin.roomIndex].roomClients.push(clients[socket.id])) - 1; //set client object in the room
              clients[socket.id].inRoom = roomToJoin.roomIndex;
              socket.emit('joinedRoom');
      }
      console.log(rooms);
  });

  socket.on('clientReady', function() {
      clients[socket.id].isReady = true;
      console.log(clients[socket.id]);
      var allReady = true;
      for(var i = 0; i < rooms[clients[socket.id].inRoom].roomClients.length; i++) {
          if(!rooms[clients[socket.id].inRoom].roomClients[i].isReady)
              allReady = false;
      }
      if(allReady) {
          io.in(rooms[clients[socket.id].inRoom].roomName).emit('initGame');
          rooms[clients[socket.id].inRoom].hasBegun = true;
          deck.shuffle();
          console.log(deck.deck);
      }
  });

  socket.on('clientNotReady', function() {
      clients[socket.id].isReady = false;
      console.log(clients[socket.id]);
  });

  socket.on('reqCard', function() {
      console.log('in reqCard');
      socket.emit('receiveCard', deck.deck)
    });

  socket.on('disconnect', function(){
      //remove the client from their room if they are in one
      if(clients[socket.id] !== undefined) {
          var roomIndex = clients[socket.id].inRoom;
          if (roomIndex !== null) {
              rooms[roomIndex].roomSize--;
              rooms[roomIndex].roomClients.splice(clients[socket.id].playerNo, 1);
              if (rooms[roomIndex].roomSize === 0) {
                  rooms[roomIndex].hasBegun = false;
              }
          }
          //remove the socket from the global list
          delete clients[socket.id];
      }
  });
});




http.listen(3000,function() {
	console.log('listening on ' + 3000);
});