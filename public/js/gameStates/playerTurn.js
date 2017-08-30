var playerTurn = {
    create: function () {
        var game = this.game;
        game.socket.emit('initDone');
    },
    update: function() {
        var game = this.game;
        game.socket.on('beginTurn', function() {
            console.log('in beginTurn');
        })
    }
};