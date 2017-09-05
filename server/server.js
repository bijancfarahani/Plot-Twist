var express = require('express');
var app = express();
var path = require('path');
var decks = [require('./deckManager'),require('./deckManager'),require('./deckManager'),require('./deckManager')]
var http = require('http').Server(app);
var io = require('socket.io')(http);

//serve the public folder for clients
app.use(express.static(__dirname + '/../public'));

//redirect all requests to the front-end for angular to route
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
//Client object for necessary info
function Client(clientInfo, socketID) {
    for (var fld in clientInfo) {
        this[fld] = clientInfo[fld];
    }
    this.playerNo = null;
    this.socketID = socketID;
}
//global list of all currently connected clients
var clients = [];

//Define the room object for easier room data management
function Room(roomName,roomIndex) {
    this.roomName = roomName;
    this.roomIndex = roomIndex;
    this.roomSize = 0;
    this.roomClients = [];
    this.hasBegun = false;
    this.initCompleted = 0;
    //Function to find the youngest player in the room
    this.youngestPlayer = function() {
        var youngest = this.roomClients[0];
        for(var i = 0; i < this.roomClients.length; i++) {
            if(this.roomClients[i].userAge < youngest.userAge)
                youngest = this.roomClients[i];
        }
        return youngest;
    }
}
//Room toString
Room.prototype.toString = function roomToString() {
    return this.roomName;
};
//array of four instances of rooms
var rooms =[new Room('room1',0),new Room('room2',1), new Room('room3',2), new Room('room4',3)];

//SocketIO event handlers
io.on('connection', function(socket){
    //Add new client info that is indexed/related by socket ID
    socket.on('register', function(clientInfo) {
        clients[socket.id] = new Client(clientInfo, socket.id);
    });
    //Send out current rooms information
    socket.on('roomsRequest', function() {
      socket.emit('roomInfo', rooms);
    });

    //Client attempts to join a room
    socket.on('joinRoom', function(roomToJoin) {
        //Necessary conditions to allow client to join a room
        if((roomToJoin.hasJoinedRoom === 'false')       //The client has not joined any other rooms
          && rooms[roomToJoin.roomIndex].roomSize < 4   //There is space in the room to join
          && !rooms[roomToJoin.roomIndex].hasBegun) {   //Game has not begun yet
            //get the string name of a room and join it
            socket.join(rooms[roomToJoin.roomIndex].roomName);
            //increase the size of that room
            rooms[roomToJoin.roomIndex].roomSize += 1;
            //set client object in the room
            clients[socket.id].playerNo = (rooms[roomToJoin.roomIndex].roomClients.push(clients[socket.id])) - 1;
            clients[socket.id].inRoom = roomToJoin.roomIndex;
            //Let the client know they joined the room
            socket.emit('joinedRoom');
        }
    });

    socket.on('requestThisRoom', function(roomIndex) {
        socket.emit('thisRoomInfo',rooms[roomIndex.roomIndex].roomClients);
    });

    //Client sets state as ready to begin the game
    socket.on('clientReady', function() {
        //Set client state as ready
        clients[socket.id].isReady = true;
        //Check if all clients in the room are ready
        var allReady = true;
        for(var i = 0; i < rooms[clients[socket.id].inRoom].roomClients.length; i++) {
            if(!rooms[clients[socket.id].inRoom].roomClients[i].isReady)
                allReady = false;
        }
        //If all clients are ready, update room status, and tell clients to start the game
        if(allReady) {
            rooms[clients[socket.id].inRoom].hasBegun = true;
            decks[clients[socket.id].inRoom].shuffle();
            io.in(rooms[clients[socket.id].inRoom].roomName).emit('initGame');
        }
    });
    //Update client status to not ready
    socket.on('clientNotReady', function() {
        clients[socket.id].isReady = false;
    });
    socket.on('getOtherPlayers', function(roomIndex) {
        socket.emit('otherPlayersInfo',rooms[roomIndex.roomIndex].roomClients);
    });

    socket.on('getInitialCards', function() {
        console.log('in reqCard');
        var cards = [];
        for(var i = 0; i < 9; i++) {
            cards.push(decks[clients[socket.id].inRoom].deck[0]);
            decks[clients[socket.id].inRoom].deck.splice(0,1);
        }
        socket.emit('cardsGot', cards);
    });

    /*After all players have chosen initial cards, let the youngest player
    know that they can go first*/
    socket.on('initDone', function() {
        console.log('in initDOne');
        var roomIndex = clients[socket.id].inRoom;
        rooms[roomIndex].initCompleted++;
        console.log(rooms[roomIndex].roomSize + ' ' + rooms[roomIndex].initCompleted);
        if(rooms[roomIndex].initCompleted === rooms[roomIndex].roomSize) {
            decks[roomIndex].setThinkTank();
            var youngestPlayer = rooms[roomIndex].youngestPlayer();
            console.log(youngestPlayer.socketID);
            console.log(socket.id);
            var cardData = {deckCard:decks[roomIndex].deck[0],
                thinkTank: decks[roomIndex].thinkTank,
                discardCard:decks[roomIndex].discardPileTop()};
            if(youngestPlayer.socketID === socket.id) {
                socket.emit('beginTurn',cardData);
            }
            else {
                socket.broadcast.to(youngestPlayer.socketID).emit('beginTurn',cardData);
            }
        }
    });
    socket.on('requestTableCards', function() {
        var roomIndex = clients[socket.id].inRoom;
        var cardData = {deckCard:decks[roomIndex].deck[0],
            thinkTank: decks[roomIndex].thinkTank,
            discardCard:decks[roomIndex].discardPileTop()};
        socket.emit('beginTurn',cardData);
    });
    socket.on('thinkTankUpdate', function(updatedThinkTank) {
        var roomIndex = clients[socket.id].inRoom;
        decks[roomIndex].thinkTank = updatedThinkTank;
        console.log(decks[roomIndex].thinkTank);
    });
    //Client removes the top card from the deck
    socket.on('deckCardTaken', function() {
       console.log(decks[clients[socket.id].inRoom].deck);
       decks[clients[socket.id].inRoom].deck.splice(0,1);
    });
    socket.on('toDiscardPile', function(card) {
        var roomIndex = clients[socket.id].inRoom;
        decks[roomIndex].discardPile.push(card);
        console.log(decks[roomIndex].discardPile);
    });
    socket.on('discardCardTaken', function() {
        var roomIndex = clients[socket.id].inRoom;
        var lastCard = decks[roomIndex].discardPileTop();
        decks[roomIndex].discardPile.splice(lastCard,1);
    });
    //Handler for when a client disconnects
    socket.on('disconnect', function(){
        //remove the client from their room if they are in one
        if(clients[socket.id] !== undefined) {
            //Check if a client is actually in a room
            var roomIndex = clients[socket.id].inRoom;
            if (roomIndex !== null) {
                //Update the room structure as needed
                rooms[roomIndex].roomSize--;
                for(var i = 0; i < rooms[roomIndex].roomClients.length; i++) {
                    if(rooms[roomIndex].roomClients[i].socketID === socket.id) {
                        rooms[roomIndex].roomClients.splice(i, 1);
                    }
                }
                //If the last room client has left, do additional updates
                if (rooms[roomIndex].roomSize === 0) {
                    rooms[roomIndex].roomClients = [];
                    rooms[roomIndex].hasBegun = false;
                    rooms[roomIndex].initCompleted = 0;
                    decks[roomIndex].resetDeck();
                }
            }
            //remove the socket from the global list
            delete clients[socket.id];
            //TODO: check if internal rooms automatically clear out on disconnect
        }
  });
});

//Listen for the correct port
http.listen(3000,function() {
	console.log('listening on ' + 3000);
});