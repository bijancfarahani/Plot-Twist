var app = angular.module('gameController',[])
    .controller('gameController', function($scope, socket) {
        //Declare Phaser game object
        var game = new Phaser.Game(1280, 720, Phaser.AUTO, document.getElementById('gameDiv'));
        //Attach the socket to the game object so that various states can access it
        game.socket = socket;
        //Arrays for the players hand and story
        game.playerHand = [];
        game.playerStory = [];
        game.thinkTank = [];
        //Add various game states and start with asset loading
        game.state.add('assetLoad',assetLoad);
        game.state.add('initialDeal',initialDeal);
        game.state.add('playerWait',playerWait);
        game.state.add('playerDraw', playerDraw);
        game.state.add('playerTurn', playerTurn);
        //get other players info
        socket.emit('getOtherPlayers');
        socket.on('otherPlayersInfo',function(data) {
            console.log(data);
            for(var i = 0; i < data.clients.length; i++) {
                console.log('in loop ' + i);
                if(data.clients[i].userName === window.sessionStorage.getItem('userName')) {
                    data.clients.splice(i,1);

                    game.otherPlayers = data.clients;
                    console.log(game.otherPlayers);
                    //begin the game
                    game.state.start('assetLoad');

                }
            }
            //game.state.start("assetLoad"); //Is it ok for this to be outside the loop (async??)
        });

    });