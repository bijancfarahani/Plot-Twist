var playerTurn = {
    game: null,
    handGroup: null,
    selectedHandStoryCard: null,
    buttonGroup: null,
    otherPlayerSelected: null,
    create: function() {
        playerTurn.game = this.game;
        var game = this.game;
        //define and draw the player hand cards
        playerTurn.handGroup = game.add.group();
        playerTurn.handGroup.scale.setTo(0.3);
        playerTurn.handGroup.inputEnableChildren = true;
        for(var i = 0; i < game.playerHand.length; i++) {
            var cardSprite = game.add.sprite((i * 700) + 70 , 1150,
                game.playerHand[i].cardName);
            if(game.playerHand[i].cardType === 'Story') {
                cardSprite.events.onInputDown.add(playerTurn.selectHandCardToSwap,this);
            }
            if(game.playerHand[i].cardType === 'Event') {
                cardSprite.events.onInputDown.add(playerTurn.selectEventCard,this);
            }
            playerTurn.handGroup.add(cardSprite);
        }
        //define and draw the player story cards
        game.storyGroup = this.game.add.group();
        game.storyGroup.scale.setTo(0.25);
        game.storyGroup.inputEnableChildren = true;
        game.storyGroup.onChildInputDown.add(playerTurn.selectStoryCardToSwap,this);
        for(var i = 0; i < game.playerStory.length; i++) {
            game.storyGroup.add(game.add.sprite((i * 700) + 100 , 100, game.playerStory[i].cardName));
        }
        playerTurn.buttonGroup = this.game.add.group();

        for(var i = 0; i < game.otherPlayers.length; i++) {
            var button = game.make.button(game.world.centerX + (i * 100), 300, 'button',playerTurn.buttonClick);
            button.userName = game.otherPlayers.userName;
            var textStyle = {font: '14px Arial', fill: "#ffb675", align: 'center'};
            var playerText = game.add.text(game.world.centerX + (i * 100),300, game.otherPlayers[i].userName,textStyle);

            playerTurn.buttonGroup.add(button);
            playerTurn.buttonGroup.add(playerText);
            playerTurn.buttonGroup.visible = true;
        }
    },
    update: function() {
    },
    //select a story card from the hand to swap or nullify a selection
    selectHandCardToSwap: function(handSprite) {
        if(playerTurn.selectedHandStoryCard === null)
            playerTurn.selectedHandStoryCard = handSprite.key;
        else
            playerTurn.selectedHandStoryCard = null;
    },
    selectStoryCardToSwap: function(storySprite) {
        if (playerTurn.selectedHandStoryCard === null)
            return;
        //change the card texture to that from the hand card
        var storyCard = storySprite.key;
        storySprite.loadTexture(playerTurn.selectedHandStoryCard);
        var handCard;
        var handCardIndex;
        //find the card in the player hand
        for(var i = 0; i < playerTurn.game.playerHand.length; i++)  {
            if(playerTurn.game.playerHand[i].cardName === playerTurn.selectedHandStoryCard) {
                handCard = playerTurn.game.playerHand[i];
                handCardIndex = i;
                break;
            }
        }
        //find the story card and change it to the card in the hand
        //let the server know to add the old card to the discard pile
        for(var i = 0; i < playerTurn.game.playerStory.length; i++)  {
            if(playerTurn.game.playerStory[i].cardName === storyCard) {
                storyCard = playerTurn.game.playerStory[i];
                playerTurn.game.playerStory[i] = handCard;
                playerTurn.handGroup.removeChildAt(handCardIndex);
                //TODO:Write and call function to redraw hand
                console.log(playerTurn.handGroup);
                playerTurn.game.socket.emit('toDiscardPile',storyCard);
                break;
            }
        }
    },
    //This is where Event Card functions are stored
    selectEventCard: function(cardSprite) {
        console.log(cardSprite.key);
        console.log(playerTurn.game.otherPlayers);
        switch(cardSprite.key) {
            case 'shadow_man':
                playerTurn.buttonGroup.visible = true;

                break;
            case 'writers_block':
                break;
            case 'plagiarism':
                break;
            case 'inspiration':
                break;
            case 'magic_pen':
                break;
        }
    },
    buttonClick: function(button) {
        playerTurn.otherPlayerSelected = button.userName;
    }
};