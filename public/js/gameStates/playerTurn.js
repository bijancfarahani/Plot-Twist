var playerTurn = {
    game: null,
    handGroup: null,
    selectedHandStoryCard: null,
    create: function() {
        playerTurn.game = this.game;
        //define and draw the player hand cards
        playerTurn.handGroup = this.game.add.group();
        playerTurn.handGroup.scale.setTo(0.3);
        playerTurn.handGroup.inputEnableChildren = true;
        for(var i = 0; i < playerTurn.game.playerHand.length; i++) {
            var cardSprite = playerTurn.game.add.sprite((i * 700) + 70 , 1150,
                playerTurn.game.playerHand[i].cardName);
            if(playerTurn.game.playerHand[i].cardType === 'Story') {
                cardSprite.events.onInputDown.add(playerTurn.selectHandCardToSwap,this);
            }
            playerTurn.handGroup.add(cardSprite);
        }
        //define and draw the player story cards
        this.game.storyGroup = this.game.add.group();
        this.game.storyGroup.scale.setTo(0.25);
        this.game.storyGroup.inputEnableChildren = true;
        this.game.storyGroup.onChildInputDown.add(playerTurn.selectStoryCardToSwap,this);
        for(var i = 0; i < playerTurn.game.playerStory.length; i++) {
            playerTurn.game.storyGroup.add(playerTurn.game.add.sprite((i * 700) + 100 , 100,
                playerTurn.game.playerStory[i].cardName));
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
    }
};