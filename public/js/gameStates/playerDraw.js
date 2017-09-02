var playerDraw = {
    thinkGroup: null,
    thinkCardSelected: null,
    thinkCardClick: false,
    handCardClick: false,
    deckCard: null,
    discardCard: null,
    game: null,
    create: function () {
        console.log('in create');
        playerDraw.game = this.game;
        var game = this.game;

        this.thinkGroup = game.add.group();
        game.thinkGroup = this.thinkGroup;
        this.thinkGroup.scale.setTo(0.25);
        this.thinkGroup.inputEnableChildren = true;
        this.thinkGroup.onChildInputDown.add(playerDraw.selectThinkCard,this);

        this.handGroup = game.add.group();
        this.handGroup.inputEnableChildren = true;
        this.handGroup.onChildInputDown.add(playerDraw.SwapThinkWithHand,this);
        this.handGroup.scale.setTo(0.3);
        for(var i = 0; i < game.playerHand.length; i++) {

            this.handGroup.add(game.add.sprite((i * 700) + 70 , 1150, game.playerHand[i].cardName));
        }
        if(game.firstMove) {
            game.socket.emit('initDone');
            game.firstMove = false;
        }
        else {
            game.socket.emit('requestTableCards');
        }
    },
    update: function() {
        var game = this.game;

        game.socket.on('beginTurn', function(data) {
            console.log(data);
            var deckCardSprite = (game.add.sprite(600,30,'cardBack'));
            deckCardSprite.scale.setTo(0.25);
            deckCardSprite.inputEnabled = true;
            playerDraw.deckCard = new Card(data.deckCard.cardType,data.deckCard.cardName,
                data.deckCard.cardStory,data.deckCard.cardAct);
            deckCardSprite.cardName = data.deckCard.cardName;
            deckCardSprite.events.onInputDown.add(playerDraw.deckSelect, this);
            if(data.discardCard) {
                playerDraw.discardCard = new Card(data.discardCard.cardType,data.discardCard.cardName,
                    data.discardCard.cardStory,data.discardCard.cardAct);
                var discardCardSprite = (game.add.sprite(800, 20, data.discardCard.cardName));
                discardCardSprite.scale.setTo(0.25);
                discardCardSprite.inputEnabled = true;
                discardCardSprite.events.onInputDown.add(playerDraw.selectDiscardCard, this);
                discardCardSprite.cardName = data.discardCard.cardName;
            }
            for(var i = 0; i < data.thinkTank.length; i ++) {
                var thinkCard = game.add.sprite((700 * i) + 150, 100,data.thinkTank[i].cardName);
                playerDraw.game.thinkTank.push(new Card(data.thinkTank[i].cardType,data.thinkTank[i].cardName,
                    data.thinkTank[i].cardStory, data.thinkTank[i].cardAct));
                thinkCard.cardName = data.thinkTank[i].cardName;
                thinkCard.thinkTankPosition = i;
                playerDraw.thinkGroup.add(thinkCard);
            }

        });
    },
    selectThinkCard: function(sprite) {
        playerDraw.thinkCardSelected = sprite.cardName;
        playerDraw.thinkCardClick = !playerDraw.thinkCardClick;
        console.log(playerDraw.thinkCardSelected + ' ' + playerDraw.thinkCardClick);
    },
    SwapThinkWithHand: function(handSprite) {
        if(playerDraw.thinkCardClick) {
            var thinkSprite;
            for (var i = 0; i < playerDraw.thinkGroup.length; i++) {
                thinkSprite = playerDraw.thinkGroup.getChildAt(i);
                if (thinkSprite.cardName === playerDraw.thinkCardSelected) {
                    playerDraw.thinkGroup.removeChildAt(i);
                    break;
                }
            }
            var thinkX = thinkSprite.position.x;
            var thinkY = thinkSprite.position.y;
            var handX = handSprite.position.x;
            var handY = handSprite.position.y;
            var tempSprite = thinkSprite;
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
            playerDraw.game.socket.emit('thinkTankUpdate', playerDraw.game.thinkTank);
            playerDraw.thinkGroup.add(playerDraw.game.add.sprite(thinkX, thinkY, handSprite.key));
            playerDraw.handGroup.add(playerDraw.game.add.sprite(handX, handY, tempSprite.cardName));
            playerDraw.changeState();
        }
    },
    deckSelect: function(sprite) {
        console.log(sprite.cardName);
        console.log(sprite.key);
        playerDraw.game.playerHand.push(playerDraw.deckCard);
        playerDraw.game.socket.emit('deckCardTaken');
        console.log(playerDraw.game.playerHand);
        playerDraw.changeState();
    },
    selectDiscardCard: function() {
        playerDraw.game.playerHand.push(playerDraw.discardCard);
        playerDraw.game.socket.emit('discardCardTaken');
        playerDraw.changeState();
    },
    changeState: function() {
        playerDraw.deckCard.inputEnabled = false;
        playerDraw.thinkGroup.ignoreChildInput = false;
        if(playerDraw.discardCard)
            playerDraw.discardCard.inputEnabled = false;
        playerDraw.game.state.start('playerTurn');


    }
};