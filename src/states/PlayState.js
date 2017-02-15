PlayState = function() {
    this.cards = game.add.group();
};

PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;
PlayState.prototype.create = function() {

    PlayState.prototype.createCards(1);
};

PlayState.prototype.update = function() {
    // Check for a flip with matched cards
    if (gameManager.cardsSelected == 2 && !gameManager.checkingMatch && gameManager.cardOne !== null && gameManager.cardTwo !== null && gameManager.cardsFlipping == 0) {
        console.log("Checking for a match");
        gameManager.checkMatches();
    }
};

PlayState.prototype.createCards = function(level) {

    // When creating cards, they must all fit on the screen in even rows. We need to be
    // able to automatically calculate how many rows, starting positions, card scale,
    // etc. 

    // Our "endless" mode starts out with a 2x5 grid. This fits all cards at maximum scale
    // neatly within the game window.

    // Level data
    var levelData = {
        "1" : { // 2x5
            normalCards: 12,
            trapCards: 0,
            safeCards: 0,
            xScale: 0.5,
            yScale: 0.5,
        },
        "2" : { // 3x6
            normalCards: 18,
            trapCards: 0,
            safeCards: 0,
            xScale: 0.95,
            yScale: 0.95,
        },
        "3" : { // 4x7
            normalCards: 28,
            trapCards: 0,
            safeCards: 0,
            xScale: 0.85,
            yScale: 0.85,
        },
        "4" : { // 5x8
            normalCards: 40,
            trapCards: 0,
            safeCards: 0,
            xScale: 0.73,
            yScale: 0.65,
        },
        "5" : { // 6x9
            normalCards: 54,
            trapCards: 0,
            safeCards: 0,
            xScale: 1,
            yScale: 1,
        },
        "6" : { // 8x8
            normalCards: 64,
            trapCards: 0,
            safeCards: 0,
            xScale: 1,
            yScale: 1,
        },
        "7" : { // 8x10
            normalCards: 80,
            trapCards: 0,
            safeCards: 0,
            xScale: 1,
            yScale: 1,
        },
    };

    var posXBase = 175;
    var posYBase = 150 * levelData[level]["yScale"];
    var posX = posXBase;
    var posY = posYBase;
    var widthBase = 500;
    var heightBase = 500;

    var maxCards = levelData[level]["normalCards"];

    // Cards need to be created in pairs with unique faces
    // To do this, create an array containing all the possible sprite indexes for our faces
    var availableFacesArray = [];
    for (var i = 0; i < 37; i++) {
        availableFacesArray.push(i);
    }

    var facesArray = [];

    // Choose the faces we'll be using before creating/position cards
    for (var i = 0; i < maxCards / 2; i++) {

        console.log("picking a new face");
        console.log(availableFacesArray);

        // Grab a random face from the remaining choices
        var faceIndex = Math.floor((Math.random() * availableFacesArray.length) + 1);

        console.log("got a few: " + faceIndex);

        // Probably not the best way to do it, but we need each face twice
        facesArray.push(availableFacesArray[faceIndex-1]);
        facesArray.push(availableFacesArray[faceIndex-1]);

        // Pop this value off of the array
        availableFacesArray.splice(faceIndex-1, 1);

        console.log("faces chosen");
        console.log(availableFacesArray);
        shuffle(facesArray);
    }

    // Now go through all cards and create them with the first face from the shuffled facesArray
    for (var i = 0; i < maxCards; i++) {
        // Make sure the card fits on the screen width-wise.
        if (posX + (widthBase * levelData[level]["xScale"]) >= 1024) {
            posX = posXBase;
            posY += (heightBase * levelData[level]["yScale"]) + (25 * levelData[level]["yScale"]);
        }

        // Grab a random face from the remaining choices
        var faceIndex = Math.floor((Math.random() * facesArray.length) + 1);

        var card = new NormalCard(game, posX, posY, 'cardback', 'card', facesArray.pop());
        
        // Update scale to fit screen
        card.scale.setTo(levelData[level]["xScale"], levelData[level]["yScale"]);
        card.props.originalScale = card.scale.x;
        //card.props.originalScale = card.scale.x;

        //this.cards.add(card);

        // Just for a little extra randomness. This probably isn't necessary nor great for performance
        shuffle(facesArray);

        posX += (widthBase * levelData[level]["xScale"]);
    }
}