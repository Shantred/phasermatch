NormalCard = function(game, x, y, cardBack, cardFront, veggieIndex) {
    BaseCard.call(this, game, x, y, cardBack, cardFront);

    //this.parent = this;
    this.props.veggieIndex = veggieIndex;

    // The card identifier is what allows us to tell if two cards match.
    // The identifier is simply <card_type>_<faceID> Ex: Normal_17
    this.identifier = "Normal_" + veggieIndex;

    // Setup debugger
    this.debug = new Debugger("NormalCard");
    this.debug.addOptions({
        cardAnims: false,
        miscDebug: false
    });

    this.flip = function() {
        var _this = this;
        BaseCard.prototype.flip(this);
    };

    this.flipToFront = function() {
        var _this = this;
        BaseCard.prototype.flipToFront(this, function() {
            _this.addChild(game.make.sprite(0,0, 'veggies', _this.props.veggieIndex));
        }, function() {
            // 
        })
    };

    this.flipToBack = function() {
        var _this = this;
        BaseCard.prototype.flipToBack(this, function() {
            _this.removeChildAt(0);
        }, function() {
            // 
        });
    }

    this.events.onInputDown.add(this.flip, this);
};

NormalCard.prototype = Object.create(BaseCard.prototype);
NormalCard.prototype.constructor = NormalCard;