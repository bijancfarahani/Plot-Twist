var playerTurn = {
    game: null,
    handGroup: null,
    create: function() {
        playerTurn.game = this.game;
        playerTurn.handGroup = this.game.add.group();
        playerTurn.handGroup.scale.setTo(0.3);
        for(var i = 0; i < playerTurn.game.playerHand.length; i++) {
            playerTurn.handGroup.add(playerTurn.game.add.sprite((i * 700) + 70 , 1150, playerTurn.game.playerHand[i].cardName));
        }
        this.game.storyGroup = this.game.add.group();
        this.game.storyGroup.scale.setTo(0.25);
        for(var i = 0; i < playerTurn.game.playerStory.length; i++) {
            playerTurn.game.storyGroup.add(playerTurn.game.add.sprite((i * 700) + 100 , 100, playerTurn.game.playerStory[i].cardName));
        }
    },
    update: function() {
    }
};