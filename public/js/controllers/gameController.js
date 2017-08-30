var app = angular.module('gameController',[])
    .controller('gameController', function($scope, socket) {
        //Declare Phaser game object
        var game = new Phaser.Game(1280, 720, Phaser.AUTO, document.getElementById('gameDiv'));
        //Attach the socket to the game object so that various states can access it
        game.socket = socket;
        //Arrays for the players hand and story
        game.playerHand = [];
        game.playerStory = [];
        //get other players info
        socket.emit('getOtherPlayers',{roomIndex: window.sessionStorage.getItem('inRoom')});
        socket.on('otherPlayersInfo',function(roomClients) {
            for(var i = 0; i < roomClients.length; i++) {
                if(roomClients[i].userName === window.sessionStorage.getItem('userName')) {
                    roomClients.splice(i,1);
                    game.otherPlayers = roomClients;
                }
            }
        });
        //Add various game states and start with asset loading
        game.state.add('assetLoad',assetLoad);
        game.state.add('initialDeal',initialDeal);
        game.state.add('playerTurn', playerTurn);
        game.state.start("assetLoad");
    });