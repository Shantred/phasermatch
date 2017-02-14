NormalCard = function(game, x, y, cardBack, cardFront) {
    BaseCard.call(this, game, x, y, cardBack, cardFront);

    //this.parent = this;

    // Setup debugger
    this.debug = new Debugger("NormalCard");
    this.debug.addOptions({
        cardAnims: true,
        miscDebug: false
    });

    this.flip = function() {
        this.debug.log("cardAnims", "flip", "Context of this before flip: ", BaseCard.prototype);
        BaseCard.prototype.flip(this);
    }

    this.events.onInputDown.add(this.flip, this);
};

NormalCard.prototype = Object.create(BaseCard.prototype);
NormalCard.prototype.constructor = NormalCard;