var playerWait = {
    create: function() {
        playerWait.game = this.game;
        //define and draw the player hand cards
        playerWait.handGroup = this.game.add.group();
        playerWait.handGroup.scale.setTo(0.3);
        for(var i = 0; i < playerWait.game.playerHand.length; i++) {
            console.log(playerWait.game.playerHand[i].cardName);
            playerWait.handGroup.add(playerWait.game.add.sprite((i * 700) + 70 , 1150,
                playerWait.game.playerHand[i].cardName));
        }
        //define and draw the player story cards
        playerWait.storyGroup = this.game.add.group();
        playerWait.storyGroup.scale.setTo(0.25);
        for(var i = 0; i < playerWait.game.playerStory.length; i++) {
            console.log(playerWait.game.playerStory[i].cardName);
            playerWait.storyGroup.add(playerWait.game.add.sprite((i * 700) + 100 , 100,
                playerWait.game.playerStory[i].cardName));
        }
    },
    update: function() {

    }
};