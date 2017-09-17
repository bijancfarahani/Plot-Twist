var playerDraw = {
    //global references
    thinkGroup: null,
    thinkCardSelected: null,
    handGroup: null,
    handCardClick: false,
    deckCard: null,
    discardCard: null,
    game: null,
    create: function () {
        playerDraw.game = this.game;
        //set properties for think tank cards
        playerDraw.thinkGroup = playerDraw.game.add.group();
        playerDraw.thinkGroup.scale.setTo(0.25);
        playerDraw.thinkGroup.inputEnableChildren = true;
        playerDraw.thinkGroup.onChildInputDown.add(playerDraw.selectThinkCard,this);
        //set properties for player hand cards
        playerDraw.handGroup = playerDraw.game.add.group();
        playerDraw.handGroup.inputEnableChildren = true;
        playerDraw.handGroup.onChildInputDown.add(playerDraw.SwapThinkWithHand,this);
        playerDraw.handGroup.scale.setTo(0.3);
        //position player cards on the screen
        for(var i = 0; i < playerDraw.game.playerHand.length; i++) {
            playerDraw.handGroup.add(playerDraw.game.add.sprite((i * 700) + 70 , 1150,
                playerDraw.game.playerHand[i].cardName));
        }
        playerDraw.game.socket.emit('requestTableCards');
    },
    update: function() {
        //This function can only be called after the initialDeal state
        playerDraw.game.socket.on('beginPlayerWait', function() {
            playerDraw.game.state.start('playerWait');
        });

        //This function always gives player the ability to begin their turn
        playerDraw.game.socket.on('beginTurn', function(data) {
            //Set properties of the deck card, both the sprite and card object
            var deckCardSprite = (playerDraw.game.add.sprite(600,30,'cardBack'));
            deckCardSprite.scale.setTo(0.25);
            deckCardSprite.inputEnabled = true;
            playerDraw.deckCard = new Card(data.deckCard);
            deckCardSprite.cardName = data.deckCard.cardName;
            deckCardSprite.events.onInputDown.add(playerDraw.deckSelect, this);
            //Set properties for the discard pile, if there is a card there
            if(data.discardCard) {
                playerDraw.discardCard = new Card(data.discardCard);
                var discardCardSprite = (playerDraw.game.add.sprite(800, 20, data.discardCard.cardName));
                discardCardSprite.scale.setTo(0.25);
                discardCardSprite.inputEnabled = true;
                discardCardSprite.events.onInputDown.add(playerDraw.selectDiscardCard, this);
                discardCardSprite.cardName = data.discardCard.cardName;
            }
            //Set properties for the think tank cards
            for(var i = 0; i < data.thinkTank.length; i ++) {
                var thinkCard = playerDraw.game.add.sprite((700 * i) + 150, 100,data.thinkTank[i].cardName);
                playerDraw.game.thinkTank.push(new Card(data.thinkTank[i]));
                thinkCard.cardName = data.thinkTank[i].cardName;
                thinkCard.thinkTankPosition = i;
                playerDraw.thinkGroup.add(thinkCard);
            }

        });
    },
    //select or clear a think tank card to swap
    selectThinkCard: function(sprite) {
        if(playerDraw.thinkCardSelected === sprite.key)
            playerDraw.thinkCardSelected = null;
        playerDraw.thinkCardSelected = sprite.key;
    },
    SwapThinkWithHand: function(handSprite) {
        //Do nothing if no think tank card selected
        if(playerDraw.thinkCardSelected === null) return;

        //find the think tank card and remove it from the group
        var thinkSprite;
        for (var i = 0; i < playerDraw.thinkGroup.length; i++) {
            thinkSprite = playerDraw.thinkGroup.getChildAt(i);
            if (thinkSprite.key === playerDraw.thinkCardSelected) {
                break;
            }
        }
        var tempSprite = thinkSprite;
        //update the think tank and player hand data structures
        for(var i = 0; i < playerDraw.game.playerHand.length; i++) {
            console.log(playerDraw.game.playerHand[i].cardName);
            if(playerDraw.game.playerHand[i].cardName === handSprite.key) {
                for(var j = 0; j < playerDraw.game.thinkTank.length; j++) {
                    if(playerDraw.game.thinkTank[j].cardName === thinkSprite.key) {
                        var tempCard = playerDraw.game.thinkTank[j];
                        playerDraw.game.thinkTank[j] = playerDraw.game.playerHand[i];
                        playerDraw.game.playerHand[i] = tempCard;
                        break;
                    }
                }
            }
        }
        //change the card sprites
        thinkSprite.loadTexture(handSprite.key);
        handSprite.loadTexture(tempSprite.key);
        playerDraw.game.socket.emit('thinkTankUpdate', playerDraw.game.thinkTank);
        playerDraw.changeState();

    },
    //add the deck card to the player hand and let the server know
    deckSelect: function() {
        playerDraw.game.playerHand.push(playerDraw.deckCard);
        playerDraw.game.socket.emit('deckCardTaken');
        playerDraw.changeState();
    },
    //add the discard card to the player hand and let the server know
    selectDiscardCard: function() {
        playerDraw.game.playerHand.push(playerDraw.discardCard);
        playerDraw.game.socket.emit('discardCardTaken');
        playerDraw.changeState();
    },
    //change the state to the rest of the player turn
    changeState: function() {
        //TODO: do these input handlers need to be here at all?
        playerDraw.deckCard.inputEnabled = false;
        playerDraw.thinkGroup.ignoreChildInput = false;
        if(playerDraw.discardCard)
            playerDraw.discardCard.inputEnabled = false;
        playerDraw.game.state.start('playerTurn');
    }
};