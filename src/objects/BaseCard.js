BaseCard = function(game, x, y, cardBack, cardFront) {
    Phaser.Sprite.call(this, game, x, y, cardBack);
    this.anchor.setTo(0.5, 0.5);
    this.inputEnabled = true;

    this.props = {
        originalScale  : this.scale.x,
        cardFront      : cardFront,
        cardBack       : cardBack,
        currentFace    : "back",
        isFlipping     : false,
        flipSpeed      : 500, // Time in ms, split between shrink and expand tween,
        gmPointer      : null,
        isInteractable : true,
    };

    // Setup debugger
    this.debug = new Debugger("BaseCard");
    this.debug.addOptions({
        cardAnims: false,
        miscDebug: false
    });

    game.add.existing(this);
};

BaseCard.prototype = Object.create(Phaser.Sprite.prototype);
BaseCard.prototype.constructor = BaseCard;
BaseCard.prototype.flip = function(card) {

    // card.debug.toggleOverride();
    // card.debug.log(null, "flip","Game Manager before flipping: ", gameManager);
    // card.debug.log(null, "flip", "Card before flipping: ", card);
    // card.debug.toggleOverride();

    // For the base card, simply execute the flip animation
    if (!card.props.isFlipping && card.props.isInteractable && gameManager.cardsFlipping < 2) {
        card.debug.log("cardAnims", "flip", "Beginning flip: ", card);

        // For the flip animation, shrink the scale of x until 0, switch the sprite texture
        // and then expand it back out to the original scale.
        if (card.props.currentFace == "front")
            card.flipToBack();

        if (card.props.currentFace == "back")
            card.flipToFront();
    }
}

BaseCard.prototype.flipToBack = function(_this, shrinkCallback, expandCallback) {
    // When flipping front-back we need to remove the child sprites once the
    // scaling has gone to 0
    gameManager.cardsFlipping++;
    _this.props.isFlipping = true;
    var shrinkTween = game.add.tween(_this.scale).to(
        {x : 0},
        _this.props.flipSpeed / 2,
        Phaser.Easing.Linear.None,
        true
    );
    shrinkTween.onComplete.add(function() {

        // _This primitive base class only has one child sprite, but will be expanded
        // upon later and _this will need to be refactored
        shrinkCallback.call();
        _this.loadTexture(_this.props.cardBack);

        // Begin the next tween
        var expandTween = game.add.tween(_this.scale).to(
            {x: _this.props.originalScale},
            _this.props.flipSpeed / 2,
            Phaser.Easing.Linear.None,
            true
        );

        // When done, allow flipping again and set face to correct state
        expandTween.onComplete.add(function() {
            expandCallback.call();
            gameManager.cardsFlipping--;
            _this.props.isFlipping = false;
            _this.props.currentFace = "back";
            gameManager[_this.props.gmPointer] = null;
            _this.props.gmPointer = null;
            gameManager.cardsSelected--;
        });
    });
}

BaseCard.prototype.flipToFront = function(_this, shrinkCallback, expandCallback) {
    if (gameManager.cardsSelected >= 2)
        return;

    gameManager.cardsFlipping++;
    gameManager.cardsSelected++;
    _this.debug.log("cardAnims", "flipToFront", "Pre-tween context: ", _this);

    // When flipping back-front, we need to be sure to add the card face sprite
    // as a child to the card blank when we are done scaling to 0
    _this.props.isFlipping = true;
    var shrinkTween = game.add.tween(_this.scale).to(
        {x : 0},
        _this.props.flipSpeed / 2,
        Phaser.Easing.Linear.None,
        true
    );
    shrinkTween.onComplete.add(function() {
        _this.debug.log("cardAnims", "flipToFront", "Mid-tween context: ", _this);
        _this.loadTexture(_this.props.cardFront);

        // Placeholder as proof of concept for now
        //_this.addChild(game.make.sprite(0,0, 'veggies', 17));
        shrinkCallback.call();

        // Begin the next tween
        var expandTween = game.add.tween(_this.scale).to(
            {x: _this.props.originalScale},
            _this.props.flipSpeed / 2,
            Phaser.Easing.Linear.None,
            true
        );

        // When done, allow flipping again and set face to correct state
        expandTween.onComplete.add(function() {
            gameManager.cardsFlipping--;
            _this.props.isFlipping = false;
            _this.props.currentFace = "front";
            if (gameManager.cardOne === null) {
                gameManager.cardOne = _this;
                _this.props.gmPointer = "cardOne";
            } else {
                gameManager.cardTwo = _this;
                _this.props.gmPointer = "cardTwo";
            }
        });
    });
}

BaseCard.prototype.disable = function(_this, callback) {
    // For now, when disabling a matched card just set isInteractable = false
    // and then lower the opacity
    _this.props.isInteractable = false;
    _this.alpha = 0.5;
    _this.props.gmPointer = null;
    callback.call();
}

BaseCard.prototype.enable = function(_this, callback) {
    _this.props.isInteractable = true;
    _this.alpha = 1;
    callback.call();
}