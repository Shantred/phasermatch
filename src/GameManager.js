GameManager = function() {
    this.cardsSelected = 0;
    this.matchesComplete = 0;
    this.cardOne = null;
    this.cardTwo = null;
    this.checkingMatch = false;

    this.checkMatches = function() {
        this.checkingMatch = true;
        if (this.cardOne.identifier == this.cardTwo.identifier) {
            console.log("Found a match!");
        }
    }
}