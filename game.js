var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('kingcard', './assets/kingcard.png');
    game.load.image('kingcardback', './assets/kingcardback.png');
    game.load.spritesheet('veggies', './assets/fruitnveg64wh37.png', 64, 64, 37);

}

function create() {

    // Place cards in a 2x4 grid
    var posXBase = 100;
    var posYBase = 150;
    var posX = posXBase;
    var posY = posYBase;

    var maxCards = 8;
    for (var i = 0; i < maxCards; i++) {
        // Make sure the card fits on the screen width-wise. Cards are 131 pixels wide
        if (posX + 131 >= 800 - 131) {
            posX = posXBase;
            posY += 192 + 50;
        }

        new NormalCard(game, posX, posY, 'kingcardback', 'kingcard');

        posX += 131;
    }
}

function update() {

}
