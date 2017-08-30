var initialDeal = {
    cardsSelected: 0,

    create: function () {
        this.game.socket.emit('getInitialCards');
    },
    update: function () {
        var game = this.game;
        game.socket.on('cardsGot', function (data) {
            for (var i = 0; i < 4; i++) {
                game.playerHand.push(new Card(data[0].cardType,data[0].cardName,data[0].cardStory,data[0].cardAct));
                var card = game.add.sprite((i * 300) + 70 , 350, data[0].cardName);
                card.name = data[0].cardName;
                card.scale.setTo(0.3);
                card.inputEnabled = true;
                card.events.onInputDown.add(function (card) {
                    card.hasBeenClicked = true;
                    initialDeal.cardsSelected++;
                    for(var cardIndex = 0; cardIndex < game.playerHand.length; cardIndex++) {
                        if (game.playerHand[cardIndex].cardName === card.name) {
                            game.playerStory.push(game.playerHand[cardIndex]);
                            game.playerHand.splice(cardIndex,1);
                        }
                    }
                    card.destroy();
                    if(initialDeal.cardsSelected === 5) {
                        game.state.start('playerTurn');
                    }

                }, this);
                data.splice(0, 1);
            }
            for (var j = 0; j < 5; j++) {
                game.playerHand.push(new Card(data[0].cardType,data[0].cardName,data[0].cardStory,data[0].cardAct));
                var card = game.add.sprite((j * 250) + 30, 10, data[0].cardName);
                card.name = data[0].cardName;
                card.scale.setTo(0.3);
                card.inputEnabled = true;
                card.events.onInputDown.add(function (card) {
                    card.hasBeenClicked = true;
                    initialDeal.cardsSelected++;
                    for(var cardIndex = 0; cardIndex < game.playerHand.length; cardIndex++) {
                        if (game.playerHand[cardIndex].cardName === card.name) {
                            game.playerStory.push(game.playerHand[cardIndex]);
                            game.playerHand.splice(cardIndex,1);
                        }
                    }
                    card.destroy();
                    if(initialDeal.cardsSelected === 5) {
                        game.state.start('playerTurn');
                    }
                }, this);
                data.splice(0, 1);
            }
        });
    }
};
