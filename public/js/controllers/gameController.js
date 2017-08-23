var app = angular.module('gameController',[])
    .controller('gameController', function($scope, socket) {
        console.log('in game controller');
        var game = new Phaser.Game(800, 400, Phaser.AUTO, document.getElementById('game'),{preload: preload,create: create,
        update: update});
        function preload() {
            game.load.image('sprite',"../../assets/cards/Alice/0ee9979e4daf36343cfab11530538978e00bec5c.png");

        }
        function create() {
            game.add.image(0,0,'sprite');
        }
        function update() {

        }

    });