PlayState = function() {
    // TODO
};

PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;
PlayState.prototype.create = function() {

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
};

PlayState.prototype.update = function() {
    // Check for a flip with matched cards
    if (gameManager.cardsSelected == 2 && !gameManager.checkingMatch && gameManager.cardOne !== null && gameManager.cardTwo !== null && gameManager.cardsFlipping == 0) {
        console.log("Checking for a match");
        gameManager.checkMatches();
    }
};