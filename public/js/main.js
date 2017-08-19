var game = new Phaser.Game(800, 400, Phaser.AUTO, document.getElementById('test'));
var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) {
    console.log()
}
game.state.add('Game',Game);
game.state.start('Game');