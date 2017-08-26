var deck = [];
function StoryCard(name,story,act) {
    this.cardName = name;
    this.cardStory = story;
    this.cardAct = act;
}
function declareAliceCards() {
    deck.push(new StoryCard('a_crazy_queen','Alice in Wonderland',5));
    deck.push(new StoryCard('a_talking_cat','Alice in Wonderland',4));
    deck.push(new StoryCard('alice','Alice in Wonderland', 1));
    /* deck.push(new StoryCard('Beheaded!','Alice in Wonderland',5));
     deck.push(new StoryCard('Dining Table','Alice in Wonderland', 3));
     deck.push(new StoryCard('Falling Down a Hole','Alice in Wonderland',1));
     deck.push(new StoryCard('Garden','Alice in Wonderland',1));
     deck.push(new StoryCard('Get Lost','Alice in Wonderland', 2));
     deck.push(new StoryCard('Getting Captured','Alice in Wonderland',4));
     deck.push(new StoryCard('Living Garden','Alice in Wonderland',4));
     deck.push(new StoryCard('Mad Hatter','Alice in Wonderland',3));
     deck.push(new StoryCard('Magical Hookah','Alice in Wonderland',4));
     deck.push(new StoryCard('Playing Cards','Alice in Wonderland',5));
     deck.push(new StoryCard('Rabbit Hole','Alice in Wonderland',1));
     deck.push(new StoryCard('Rabbit','Alice in Wonderland',2));
     deck.push(new StoryCard('Royal Court','Alice in Wonderland', 5));
     deck.push(new StoryCard('Shrinking Potion','Alice in Wonderland',2));
     deck.push(new StoryCard('Tea Party','Alice in Wonderland',3));
     deck.push(new StoryCard('Tea','Alice in Wonderland',3));
     deck.push(new StoryCard('Wonderland','Alice in Wonderland',2));*/
}
declareAliceCards();
module.exports.deck = deck;
module.exports.shuffle = function() {
    var l,x,j;
    console.log('in shuffle');
    for (l = deck.length; l; l--) {
        j = Math.floor(Math.random() * l);
        x = deck[l - 1];
        deck[l - 1] = deck[j];
        deck[j] = x;
    }
};