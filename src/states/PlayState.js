PlayState = function() {
    // TODO
};

PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;
PlayState.prototype.create = function() {

    PlayState.prototype.createCards(8);
};

PlayState.prototype.update = function() {
    // Check for a flip with matched cards
    if (gameManager.cardsSelected == 2 && !gameManager.checkingMatch && gameManager.cardOne !== null && gameManager.cardTwo !== null && gameManager.cardsFlipping == 0) {
        console.log("Checking for a match");
        gameManager.checkMatches();
    }
};

PlayState.prototype.createCards = function(number) {
    var posXBase = 100;
    var posYBase = 150;
    var posX = posXBase;
    var posY = posYBase;

    var maxCards = number;

    // Cards need to be created in pairs with unique faces
    // To do this, create an array containing all the possible sprite indexes for our faces
    var availableFacesArray = [];
    for (var i = 0; i < 37; i++) {
        availableFacesArray.push(i);
    }

    var facesArray = [];

    // Choose the faces we'll be using before creating/position cards
    for (var i = 0; i < maxCards / 2; i++) {
        // Grab a random face from the remaining choices
        var faceIndex = Math.floor((Math.random() * availableFacesArray.length) + 1);

        // Probably not the best way to do it, but we need each face twice
        facesArray.push(availableFacesArray[faceIndex-1]);
        facesArray.push(availableFacesArray[faceIndex-1]);

        // Pop this value off of the array
        availableFacesArray.splice(faceIndex, 1);
        shuffle(facesArray);
    }

    // Now go through all cards and create them with the first face from the shuffled facesArray
    for (var i = 0; i < maxCards; i++) {
        // Make sure the card fits on the screen width-wise. Cards are 131 pixels wide
        if (posX + 131 >= 800 - 131) {
            posX = posXBase;
            posY += 192 + 50;
        }

        // Grab a random face from the remaining choices
        var faceIndex = Math.floor((Math.random() * facesArray.length) + 1);

        new NormalCard(game, posX, posY, 'kingcardback', 'kingcard', facesArray.pop());

        // Just for a little extra randomness. This probably isn't necessary nor great for performance
        shuffle(facesArray);

        posX += 131;
    }
}