var initialDeal = {
    firstRun: 0,
    create: function() {
        console.log('IN NEW CREATE');
        this.game.socket.emit('getInitialCards');

    },
    update: function() {
        var game = this.game;
        game.socket.on('cardsGot', function(data) {
            console.log(data);
            game.add.sprite(0,0,data[0].cardName);
        });
    }

};