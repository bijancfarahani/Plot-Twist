var deck = [];
function Card(cardType,name,story,act) {
    this.cardType = cardType;
    this.cardName = name;
    this.cardStory = story;
    this.cardAct = act;
}

function declareAliceCards() {
    deck.push(new Card('Story','a_crazy_queen','Alice in Wonderland',5));
    deck.push(new Card('Story','a_talking_cat','Alice in Wonderland',4));
    deck.push(new Card('Story','alice','Alice in Wonderland', 1));
    deck.push(new Card('Story','beheaded!','Alice in Wonderland',5));
    deck.push(new Card('Story','dining_table','Alice in Wonderland', 3));
    deck.push(new Card('Story','falling_down_a_hole','Alice in Wonderland',1));
    deck.push(new Card('Story','garden','Alice in Wonderland',1));
    deck.push(new Card('Story','get_lost','Alice in Wonderland', 2));
    deck.push(new Card('Story','getting_captured','Alice in Wonderland',4));
    deck.push(new Card('Story','living_garden','Alice in Wonderland',4));
    deck.push(new Card('Story','mad_hatter','Alice in Wonderland',3));
    deck.push(new Card('Story','magical_hookah','Alice in Wonderland',4));
    deck.push(new Card('Story','playing_cards','Alice in Wonderland',5));
    deck.push(new Card('Story','rabbit_hole','Alice in Wonderland',1));
    deck.push(new Card('Story','rabbit','Alice in Wonderland',2));
    deck.push(new Card('Story','royal_court','Alice in Wonderland', 5));
    deck.push(new Card('Story','shrinking_potion','Alice in Wonderland',2));
    deck.push(new Card('Story','tea_party','Alice in Wonderland',3));
    deck.push(new Card('Story','tea','Alice in Wonderland',3));
    deck.push(new Card('Story','wonderland','Alice in Wonderland',2));
}

function declareCinderellaCards () {
    deck.push(new Card('Story','attend_the_ball','Cinderella', 4));
    deck.push(new Card('Story','attic','Cinderella', 2));
    deck.push(new Card('Story','broom','Cinderella', 1));
    deck.push(new Card('Story','carriage','Cinderella', 3));
    deck.push(new Card('Story','church','Cinderella', 5));
    deck.push(new Card('Story','cinderella','Cinderella', 1));
    deck.push(new Card('Story','dead_parents','Cinderella', 1));
    deck.push(new Card('Story','dress','Cinderella', 2));
    deck.push(new Card('Story','fairy_god_mother','Cinderella', 3));
    deck.push(new Card('Story','find_true_love','Cinderella', 5));
    deck.push(new Card('Story','glass_slipper','Cinderella', 4));
    deck.push(new Card('Story','house','Cinderella', 1));
    deck.push(new Card('Story','make_a_dress','Cinderella', 2));
    deck.push(new Card('Story','prince_charming','Cinderella', 4));
    deck.push(new Card('Story','road','Cinderella', 3));
    deck.push(new Card('Story','step_mother','Cinderella', 5));
    deck.push(new Card('Story','step_sisters','Cinderella', 2));
    deck.push(new Card('Story','the_ball','Cinderella', 4));
    deck.push(new Card('Story','transformation!','Cinderella', 3));
    deck.push(new Card('Story','wedding_ring','Cinderella', 5));
}

function declarePeterPanCards () {
    deck.push(new Card('Story','captain_hook','Peter Pan', 3));
    deck.push(new Card('Story','clock','Peter Pan', 4));
    deck.push(new Card('Story','crocodile','Peter Pan', 4));
    deck.push(new Card('Story','dagger','Peter Pan', 2));
    deck.push(new Card('Story','explore','Peter Pan', 2));
    deck.push(new Card('Story','fairy_dust','Peter Pan', 1));
    deck.push(new Card('Story','get_captured','Peter Pan', 3));
    deck.push(new Card('Story','go_on_a_trip','Peter Pan', 1));
    deck.push(new Card('Story','hideout','Peter Pan', 3));
    deck.push(new Card('Story','london','Peter Pan', 1));
    deck.push(new Card('Story','neverland','Peter Pan', 2));
    deck.push(new Card('Story','peter_pan','Peter Pan', 2));
    deck.push(new Card('Story','pirate_ship_act3','Peter Pan', 3));
    deck.push(new Card('Story','pirate_ship_act5','Peter Pan', 5));
    deck.push(new Card('Story','return_home','Peter Pan', 5));
    deck.push(new Card('Story','sword_fight','Peter Pan', 4));
    deck.push(new Card('Story','the_cove','Peter Pan', 4));
    deck.push(new Card('Story','the_hook','Peter Pan', 5));
    deck.push(new Card('Story','tinkerbell','Peter Pan', 5));
    deck.push(new Card('Story','wendy','Peter Pan', 1));

}
function declareRidingHoodCards () {
    deck.push(new Card('Story','axe','Riding Hood', 5));
    deck.push(new Card('Story','basket_of_cookies','Riding Hood', 1));
    deck.push(new Card('Story','bed','Riding Hood', 3));
    deck.push(new Card('Story','bedroom','Riding Hood', 4));
    deck.push(new Card('Story','cloak','Riding Hood', 2));
    deck.push(new Card('Story','grandma','Riding Hood', 3));
    deck.push(new Card('Story','grandmas_glasses','Riding Hood', 4));
    deck.push(new Card('Story','grandmas_house_act1','Riding Hood', 1));
    deck.push(new Card('Story','grandmas_house_act3','Riding Hood', 3));
    deck.push(new Card('Story','hunter','Riding Hood', 5));
    deck.push(new Card('Story','kill_someone','Riding Hood', 5));
    deck.push(new Card('Story','person_gets_eaten','Riding Hood', 4));
    deck.push(new Card('Story','put_on_disguise','Riding Hood', 3));
    deck.push(new Card('Story','red_riding_hood','Riding Hood', 1));
    deck.push(new Card('Story','walk_in_the_woods','Riding Hood', 1));
    deck.push(new Card('Story','wolf_attack','Riding Hood', 2));
    deck.push(new Card('Story','wolf_in_disguise','Riding Hood', 4));
    deck.push(new Card('Story','wolf','Riding Hood', 2));
    deck.push(new Card('Story','woods_act1','Riding Hood', 1));
    deck.push(new Card('Story','woods_act2','Riding Hood', 2));
}
//Only code that is run when a new deck is made
declareAliceCards();
declareCinderellaCards();
declarePeterPanCards();
declareRidingHoodCards();

module.exports.deck = deck;
module.exports.shuffle = function() {
    var l,x,j;
    for (l = deck.length; l; l--) {
        j = Math.floor(Math.random() * l);
        x = deck[l - 1];
        deck[l - 1] = deck[j];
        deck[j] = x;
    }
};
module.exports.resetDeck = function() {
    deck.length = 0;
    declareAliceCards();
    declareCinderellaCards();
    declarePeterPanCards();
    declareRidingHoodCards();
};