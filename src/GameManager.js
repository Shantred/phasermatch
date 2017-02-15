GameManager = function() {
    this.cardsSelected = 0;
    this.matchesComplete = 0;
    this.cardOne = null;
    this.cardTwo = null;
    this.checkingMatch = false;
    this.cardsFlipping = 0;

    this.debug = new Debugger();
    this.debug.addOptions({
        misc: true
    });

    this.checkMatches = function() {
        this.checkingMatch = true;
        if (this.cardOne.identifier == this.cardTwo.identifier) {
            var _this = this;
            // When a match is found, disable both cards and then allow more selections
            BaseCard.prototype.disable(_this.cardOne, function() {
                // Use the callback of card one to do card 2
                BaseCard.prototype.disable(_this.cardTwo, function() {
                    _this.cardsSelected = 0;
                    _this.matchesComplete++;
                    _this.checkingMatch = false;
                    _this.cardOne = null;
                    _this.cardTwo = null;
                });
            });
        } else {
          // When failing to find a match, flip both cards back over
          this.cardOne.flip();
          this.cardTwo.flip();
          this.checkingMatch = false;
        }
    }
}