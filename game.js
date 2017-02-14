var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('kingcard', './assets/kingcard.png');
    game.load.image('kingcardback', './assets/kingcardback.png');
    game.load.spritesheet('veggies', './assets/fruitnveg64wh37.png', 64, 64, 37);

}

function create() {

    // Create demo card
    card = new BaseCard(game, 150, 150, 'kingcardback', 'kingcard');

}

function update() {

}
