var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('kingcard', './assets/kingcard.png');
    game.load.image('kingcardback', './assets/kingcardback.png');

}

var card;
var doFlip = false;

function create() {

    //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
    card = game.add.sprite(150, 150, 'kingcardback');
    card.inputEnabled = true;
    card.events.onInputDown.add(flipCard, this);
    card.anchor.setTo(0.5, 0.5);
    card.scaleXOriginal = card.scale.x;

    card.face = 'front';
    card.flipping = false;

}

function flipCard(cardToFlip) {
	if (!cardToFlip.flipping) {
		cardToFlip.flipping = true;
		console.log("Beginning flip: ", cardToFlip);
		cardScale = cardToFlip.scale.x;

		if( cardToFlip.face == "front") {
			var tween = game.add.tween(cardToFlip.scale).to({ x: 0}, 250, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(function() { 
				cardToFlip.loadTexture('kingcard');
				var secondaryTween = game.add.tween(cardToFlip.scale).to({ x: card.scaleXOriginal}, 250, Phaser.Easing.Linear.None, true);
				secondaryTween.onComplete.add(function() {
					cardToFlip.flipping = false;
					cardToFlip.face = "back";
				});
			});
		} else {
			var tween = game.add.tween(cardToFlip.scale).to({ x: 0}, 250, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(function() { 
				cardToFlip.loadTexture('kingcardback');
				var secondaryTween = game.add.tween(cardToFlip.scale).to({ x: cardToFlip.scaleXOriginal}, 250, Phaser.Easing.Linear.None, true);
				secondaryTween.onComplete.add(function() {
					cardToFlip.flipping = false;
					cardToFlip.face = "front";
				});
			});
		}
		
	}
}

function update() {

}

function testFunction(tween) {
	tween.flipping = false;
	console.log("done. Flipping is: ", tween);
}
