var app = angular.module('gameController',[])
    .controller('gameController', function($scope, socket) {
        console.log('in game controller');
        var loc;
        socket.emit('reqCard');
        var images = [];
        var game = new Phaser.Game(1280, 720, Phaser.AUTO, document.getElementById('game'),
            {preload: preload,create: create, update: update});
        var i = 0;
        function preload() {
            game.load.image('a_crazy_queen','../../assets/cards/alice/a_crazy_queen.png');
            game.load.image('a_talking_cat','../../assets/cards/alice/a_talking_cat.png');
            game.load.image('alice','../../assets/cards/alice/alice.png');
        }
        function create() {

        }
        function update() {

            if(i === 0) {
                socket.emit('reqCard'); //add acknowledgement here (callback)
                i++;
            }
            socket.on('receiveCard', function(data) {
                var card = data[0].cardName;
                console.log(card);
                images.push(game.add.sprite(0,0,card));
                images[0].anchor.set(0.5);
                images[0].inputEnabled = true;
                images[0].events.onInputDown.add(listener, this);
            });
        }
        function listener() {
            console.log('image pressed');
        }

    });