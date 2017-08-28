var app = angular.module('gameController',[])
    .controller('gameController', function($scope, socket) {
        var game = new Phaser.Game(1280, 720, Phaser.AUTO, document.getElementById('gameDiv'));
        game.socket = socket;
        game.state.add('assetLoad',assetLoad);
        game.state.add('initialDeal',initialDeal);
        game.state.start("assetLoad");
    });