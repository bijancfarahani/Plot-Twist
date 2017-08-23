
var server = require('rumpus')(3000, {
    version: 1
});

server.addMessageHandler('USER_REQUEST_GAME', function (socket, data) {
    console.log('client has requested a game with:', data);

    socket.emit('GAME_START', game.getStartingProperties());
});