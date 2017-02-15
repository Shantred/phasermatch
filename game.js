var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
var gameManager = new GameManager();
function preload() {

    game.load.image('kingcard', './assets/kingcard.png');
    game.load.image('kingcardback', './assets/kingcardback.png');
    game.load.spritesheet('veggies', './assets/fruitnveg64wh37.png', 64, 64, 37);

    game.state.add('play', PlayState);

}

function create() {
    game.state.start('play');
}
