NormalCard = function(game, x, y, cardBack, cardFront) {
    BaseCard.call(this, game, x, y, cardBack, cardFront);

    //this.parent = this;

    // Setup debugger
    this.debug = new Debugger("NormalCard");
    this.debug.addOptions({
        cardAnims: false,
        miscDebug: false
    });

    this.flip = function() {
        var _this = this;

        this.debug.log("cardAnims", "flip", "Context of this before flip: ", BaseCard.prototype);
        BaseCard.prototype.flip(this, function() {
          _this.removeChildAt(0);
        }, function() {
            //
        });
    };

    this.flipToFront = function() {
        var _this = this;
        BaseCard.prototype.flipToFront(this, function() {
            _this.addChild(game.make.sprite(0,0, 'veggies', 17));
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