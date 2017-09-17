var initialDeal = {
    cardsSelected: 0,

    create: function () {
        this.game.socket.emit('getInitialCards');
    },
    update: function () {
        var game = this.game;
        game.socket.on('cardsGot', function (data) {
            for (var i = 0; i < 4; i++) {
                console.log(data[i]);
                game.playerHand.push(new Card(data[0]));
                var card = game.add.sprite((i * 300) + 70 , 350, data[0].cardName);
                card.name = data[0].cardName;
                card.scale.setTo(0.3);
                card.inputEnabled = true;
                card.events.onInputDown.add(initialDeal.selectCard, this);
                data.splice(0, 1);
            }
            for (var j = 0; j < 5; j++) {
                console.log(data[j]);
                game.playerHand.push(new Card(data[0]));
                var card = game.add.sprite((j * 250) + 30, 10, data[0].cardName);
                card.name = data[0].cardName;
                card.scale.setTo(0.3);
                card.inputEnabled = true;
                card.events.onInputDown.add(initialDeal.selectCard, this);
                data.splice(0, 1);
            }
        });
    },
    selectCard: function(cardSprite) {
        initialDeal.cardsSelected++;
        for(var cardIndex = 0; cardIndex < initialDeal.game.playerHand.length; cardIndex++) {
            if (initialDeal.game.playerHand[cardIndex].cardName === cardSprite.key) {
                initialDeal.game.playerStory.push(initialDeal.game.playerHand[cardIndex]);
                initialDeal.game.playerHand.splice(cardIndex,1);
            }
        }
        cardSprite.destroy();
        if(initialDeal.cardsSelected === 5) {
            initialDeal.game.state.start('playerDraw');
        }
    }
};