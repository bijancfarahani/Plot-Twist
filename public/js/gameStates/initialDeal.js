var initialDeal = {
    cardsSelected: 0,

    create: function () {
        this.game.socket.emit('getInitialCards');
    },
    update: function () {
        var game = this.game;
        game.socket.on('cardsGot', function (data) {
            for (var i = 0; i < 4; i++) {
                game.playerHand.push(new Card(data[0]));
                var card = game.add.sprite((i * 300) + 70 , 350, data[0].cardName);
                card.name = data[0].cardName;
                card.scale.setTo(0.3);
                if(data[0].cardType === 'Story') {
                    card.inputEnabled = true;
                    card.events.onInputDown.add(initialDeal.selectCard, this);
                }
                data.splice(0, 1);
            }
            for (var j = 0; j < 5; j++) {
                game.playerHand.push(new Card(data[0]));
                var card = game.add.sprite((j * 250) + 30, 10, data[0].cardName);
                card.name = data[0].cardName;
                card.scale.setTo(0.3);
                if(data[0].cardType === 'Story') {
                    card.inputEnabled = true;
                    card.events.onInputDown.add(initialDeal.selectCard, this);
                }
                data.splice(0, 1);
            }
        });
        //listen for server response for which state to load next
        game.socket.on('postInitialDeal', function(data) {
            game.state.start(data.nextState);
        })
    },
    selectCard: function(cardSprite) {
        //stop input after 5 cards selected
        if(initialDeal.cardsSelected === 5) return;
        initialDeal.cardsSelected++;
        for(var cardIndex = 0; cardIndex < initialDeal.game.playerHand.length; cardIndex++) {
            if (initialDeal.game.playerHand[cardIndex].cardName === cardSprite.key) {
                initialDeal.game.playerStory.push(initialDeal.game.playerHand[cardIndex]);
                initialDeal.game.playerHand.splice(cardIndex,1);
            }
        }
        cardSprite.destroy();
        if(initialDeal.cardsSelected === 5) {
            initialDeal.game.socket.emit('initDone');
        }
    }
};