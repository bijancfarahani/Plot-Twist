var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('sprite','assets/cards/Alice/0ee9979e4daf36343cfab11530538978e00bec5c.png');
};

Game.create = function(){
    game.add.image(0,0,'sprite');
};