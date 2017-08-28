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
    deck.push(new StoryCard('beheaded!','Alice in Wonderland',5));
    deck.push(new StoryCard('dining_table','Alice in Wonderland', 3));
    deck.push(new StoryCard('falling_down_a_hole','Alice in Wonderland',1));
    deck.push(new StoryCard('garden','Alice in Wonderland',1));
    deck.push(new StoryCard('get_lost','Alice in Wonderland', 2));
    deck.push(new StoryCard('getting_captured','Alice in Wonderland',4));
    deck.push(new StoryCard('living_garden','Alice in Wonderland',4));
    deck.push(new StoryCard('mad_hatter','Alice in Wonderland',3));
    deck.push(new StoryCard('magical_hookah','Alice in Wonderland',4));
    deck.push(new StoryCard('playing_cards','Alice in Wonderland',5));
    deck.push(new StoryCard('rabbit_hole','Alice in Wonderland',1));
    deck.push(new StoryCard('rabbit','Alice in Wonderland',2));
    deck.push(new StoryCard('royal_court','Alice in Wonderland', 5));
    deck.push(new StoryCard('shrinking_potion','Alice in Wonderland',2));
    deck.push(new StoryCard('tea_party','Alice in Wonderland',3));
    deck.push(new StoryCard('tea','Alice in Wonderland',3));
    deck.push(new StoryCard('wonderland','Alice in Wonderland',2));
}

function declareCinderellaCards () {
    deck.push(new StoryCard('attend_the_ball','Cinderella', 4));
    deck.push(new StoryCard('attic','Cinderella', 2));
    deck.push(new StoryCard('broom','Cinderella', 1));
    deck.push(new StoryCard('carriage','Cinderella', 3));
    deck.push(new StoryCard('church','Cinderella', 5));
    deck.push(new StoryCard('cinderella','Cinderella', 1));
    deck.push(new StoryCard('dead_parents','Cinderella', 1));
    deck.push(new StoryCard('dress','Cinderella', 2));
    deck.push(new StoryCard('fairy_god_mother','Cinderella', 3));
    deck.push(new StoryCard('find_true_love','Cinderella', 5));
    deck.push(new StoryCard('glass_slipper','Cinderella', 4));
    deck.push(new StoryCard('house','Cinderella', 1));
    deck.push(new StoryCard('make_a_dress','Cinderella', 2));
    deck.push(new StoryCard('prince_charming','Cinderella', 4));
    deck.push(new StoryCard('road','Cinderella', 3));
    deck.push(new StoryCard('step_mother','Cinderella', 5));
    deck.push(new StoryCard('step_sisters','Cinderella', 2));
    deck.push(new StoryCard('the_ball','Cinderella', 4));
    deck.push(new StoryCard('transformation!','Cinderella', 3));
    deck.push(new StoryCard('wedding_ring','Cinderella', 5));
}

function declarePeterPanCards () {
    deck.push(new StoryCard('captain_hook','Peter Pan', 3));
    deck.push(new StoryCard('clock','Peter Pan', 4));
    deck.push(new StoryCard('crocodile','Peter Pan', 4));
    deck.push(new StoryCard('dagger','Peter Pan', 2));
    deck.push(new StoryCard('explore','Peter Pan', 2));
    deck.push(new StoryCard('fairy_dust','Peter Pan', 1));
    deck.push(new StoryCard('get_captured','Peter Pan', 3));
    deck.push(new StoryCard('go_on_a_trip','Peter Pan', 1));
    deck.push(new StoryCard('hideout','Peter Pan', 3));
    deck.push(new StoryCard('london','Peter Pan', 1));
    deck.push(new StoryCard('neverland','Peter Pan', 2));
    deck.push(new StoryCard('peter_pan','Peter Pan', 2));
    deck.push(new StoryCard('pirate_ship_act3','Peter Pan', 3));
    deck.push(new StoryCard('pirate_ship_act5','Peter Pan', 5));
    deck.push(new StoryCard('return_home','Peter Pan', 5));
    deck.push(new StoryCard('sword_fight','Peter Pan', 4));
    deck.push(new StoryCard('the_cove','Peter Pan', 4));
    deck.push(new StoryCard('the_hook','Peter Pan', 5));
    deck.push(new StoryCard('tinkerbell','Peter Pan', 5));
    deck.push(new StoryCard('wendy','Peter Pan', 1));

}
function declareRidingHoodCards () {
    deck.push(new StoryCard('axe','Riding Hood', 5));
    deck.push(new StoryCard('basket_of_cookies','Riding Hood', 1));
    deck.push(new StoryCard('bed','Riding Hood', 3));
    deck.push(new StoryCard('bedroom','Riding Hood', 4));
    deck.push(new StoryCard('cloak','Riding Hood', 2));
    deck.push(new StoryCard('grandma','Riding Hood', 3));
    deck.push(new StoryCard('grandmas_glasses','Riding Hood', 4));
    deck.push(new StoryCard('grandmas_house_act1','Riding Hood', 1));
    deck.push(new StoryCard('grandmas_house_act3','Riding Hood', 3));
    deck.push(new StoryCard('hunter','Riding Hood', 5));
    deck.push(new StoryCard('kill_someone','Riding Hood', 5));
    deck.push(new StoryCard('person_gets_eaten','Riding Hood', 4));
    deck.push(new StoryCard('put_on_disguise','Riding Hood', 3));
    deck.push(new StoryCard('red_riding_hood','Riding Hood', 1));
    deck.push(new StoryCard('walk_in_the_woods','Riding Hood', 1));
    deck.push(new StoryCard('wolf_attack','Riding Hood', 2));
    deck.push(new StoryCard('wolf_in_disguise','Riding Hood', 4));
    deck.push(new StoryCard('wolf','Riding Hood', 2));
    deck.push(new StoryCard('woods_act1','Riding Hood', 1));
    deck.push(new StoryCard('woods_act2','Riding Hood', 2));
}

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