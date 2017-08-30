//Define Card object with high correclation to the card Object on the server-side
function Card(cardType,name,story,act) {
    this.cardType = cardType;
    this.cardName = name;   //This property will correspond with sprite names of the card
    this.cardStory = story;
    this.cardAct = act;
}