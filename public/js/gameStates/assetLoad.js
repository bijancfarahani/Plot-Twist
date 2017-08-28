var assetLoad = {
    preload: function() {
        //Load Alice in Wonderland cards
        this.game.load.image('a_crazy_queen', '../../assets/alice/a_crazy_queen.png');
        this.game.load.image('a_talking_cat', '../../assets/alice/a_talking_cat.png');
        this.game.load.image('alice', '../../assets/alice/alice.png');
        this.game.load.image('beheaded!', '../../assets/alice/beheaded!.png');
        this.game.load.image('dining_table', '../../assets/alice/dining_table.png');
        this.game.load.image('falling_down_a_hole', '../../assets/alice/falling_down_a_hole.png');
        this.game.load.image('garden', '../../assets/alice/garden.png');
        this.game.load.image('get_lost', '../../assets/alice/get_lost.png');
        this.game.load.image('getting_captured', '../../assets/alice/getting_captured.png');
        this.game.load.image('living_garden', '../../assets/alice/living_garden.png');
        this.game.load.image('mad_hatter', '../../assets/alice/mad_hatter.png');
        this.game.load.image('magical_hookah', '../../assets/alice/magical_hookah.png');
        this.game.load.image('playing_cards', '../../assets/alice/playing_cards.png');
        this.game.load.image('rabbit_hole', '../../assets/alice/rabbit_hole.png');
        this.game.load.image('rabbit', '../../assets/alice/rabbit.png');
        this.game.load.image('royal_court', '../../assets/alice/royal_court.png');
        this.game.load.image('shrinking_potion', '../../assets/alice/shrinking_potion.png');
        this.game.load.image('tea_party', '../../assets/alice/tea_party.png');
        this.game.load.image('wonderland', '../../assets/alice/wonderland.png');

        //Load Cinderella cards
        this.game.load.image('attend_the_ball', '../../assets/cinderella/attend_the_ball.png');
        this.game.load.image('attic', '../../assets/cinderella/attic.png');
        this.game.load.image('broom', '../../assets/cinderella/broom.png');
        this.game.load.image('carriage', '../../assets/cinderella/carriage.png');
        this.game.load.image('church', '../../assets/cinderella/church.png');
        this.game.load.image('cinderella', '../../assets/cinderella/cinderella.png');
        this.game.load.image('dead_parents', '../../assets/cinderella/dead_parents.png');
        this.game.load.image('dress', '../../assets/cinderella/dress.png');
        this.game.load.image('fairy_god_mother', '../../assets/cinderella/fairy_god_mother.png');
        this.game.load.image('find_true_love', '../../assets/cinderella/find_true_love.png');
        this.game.load.image('glass_slipper', '../../assets/cinderella/glass_slipper.png');
        this.game.load.image('house', '../../assets/cinderella/house.png');
        this.game.load.image('make_a_dress', '../../assets/cinderella/make_a_dress.png');
        this.game.load.image('prince_charming', '../../assets/cinderella/prince_charming.png');
        this.game.load.image('road', '../../assets/cinderella/road.png');
        this.game.load.image('step_mother', '../../assets/cinderella/step_mother.png');
        this.game.load.image('step_sisters', '../../assets/cinderella/step_sisters.png');
        this.game.load.image('the_ball', '../../assets/cinderella/the_ball.png');
        this.game.load.image('transformation!', '../../assets/cinderella/transformation!.png');
        this.game.load.image('wedding_ring', '../../assets/cinderella/wedding_ring.png');

        //Load Peter Pan cards
        this.game.load.image('captain_hook', '../../assets/peter_pan/captain_hook.png');
        this.game.load.image('clock', '../../assets/peter_pan/clock.png');
        this.game.load.image('crocodile', '../../assets/peter_pan/crocodile.png');
        this.game.load.image('dagger', '../../assets/peter_pan/dagger.png');
        this.game.load.image('explore', '../../assets/peter_pan/explore.png');
        this.game.load.image('fairy_dust', '../../assets/peter_pan/fairy_dust.png');
        this.game.load.image('get_captured', '../../assets/peter_pan/get_captured.png');
        this.game.load.image('go_on_a_trip', '../../assets/peter_pan/go_on_a_trip.png');
        this.game.load.image('hideout', '../../assets/peter_pan/hideout.png');
        this.game.load.image('london', '../../assets/peter_pan/london.png');
        this.game.load.image('neverland', '../../assets/peter_pan/neverland.png');
        this.game.load.image('peter_pan', '../../assets/peter_pan/peter_pan.png');
        this.game.load.image('pirate_ship_act3', '../../assets/peter_pan/pirate_ship_act3.png');
        this.game.load.image('pirate_ship_act5', '../../assets/peter_pan/pirate_ship_act5.png');
        this.game.load.image('return_home', '../../assets/peter_pan/return_home.png');
        this.game.load.image('sword_fight', '../../assets/peter_pan/sword_fight.png');
        this.game.load.image('the_cove', '../../assets/peter_pan/the_cove.png');
        this.game.load.image('the_hook', '../../assets/peter_pan/the_hook.png');
        this.game.load.image('tinkerbell', '../../assets/peter_pan/tinkerbell.png');
        this.game.load.image('wendy', '../../assets/peter_pan/wendy.png');

        //Load Little Red Riding Hood cards
        this.game.load.image('axe', '../../assets/riding_hood/axe.png');
        this.game.load.image('basket_of_cookies', '../../assets/riding_hood/basket_of_cookies.png');
        this.game.load.image('bed', '../../assets/riding_hood/bed.png');
        this.game.load.image('bedroom', '../../assets/riding_hood/bedroom.png');
        this.game.load.image('cloak', '../../assets/riding_hood/cloak.png');
        this.game.load.image('grandma', '../../assets/riding_hood/grandma.png');
        this.game.load.image('grandmas_glasses', '../../assets/riding_hood/grandmas_glasses.png');
        this.game.load.image('grandmas_house_act1', '../../assets/riding_hood/grandmas_house_act1.png');
        this.game.load.image('grandmas_house_act3', '../../assets/riding_hood/grandmas_house_act3.png');
        this.game.load.image('hunter', '../../assets/riding_hood/hunter.png');
        this.game.load.image('kill_someone', '../../assets/riding_hood/kill_someone.png');
        this.game.load.image('person_gets_eaten', '../../assets/riding_hood/person_gets_eaten.png');
        this.game.load.image('put_on_disguise', '../../assets/riding_hood/put_on_disguise.png');
        this.game.load.image('red_riding_hood', '../../assets/riding_hood/red_riding_hood.png');
        this.game.load.image('walk_in_the_woods', '../../assets/riding_hood/walk_in_the_woods.png');
        this.game.load.image('wolf_attack', '../../assets/riding_hood/wolf_attack.png');
        this.game.load.image('wolf_in_disguise', '../../assets/riding_hood/wolf_in_disguise.png');
        this.game.load.image('wolf', '../../assets/riding_hood/wolf.png');
        this.game.load.image('woods_act1', '../../assets/riding_hood/woods_act1.png');
        this.game.load.image('woods_act2', '../../assets/riding_hood/woods_act2.png');

        //Load event cards
        this.game.load.image('shadow_man', '../../assets/event_cards/shadow_man.png');
        this.game.load.image('writers_block', '../../assets/event_cards/writers_block.png');
        this.game.load.image('plagiarism', '../../assets/event_cards/plagiarism.png');
        this.game.load.image('inspiration', '../../assets/event_cards/inspiration.png');
        this.game.load.image('magic_pen', '../../assets/event_cards/magic_pen.png');

        //Load plot twist cards
        this.game.load.image('cut_and_paste!', '../../assets/plot_twist/cut_and_paste!.png');
        this.game.load.image('spilt_drink!', '../../assets/plot_twist/spilt_drink!.png');
        this.game.load.image('starting_stories_is_hard', '../../assets/plot_twist/starting_stories_is_hard.png');
        this.game.load.image('what_is_my_ending?', '../../assets/plot_twist/what_is_my_ending.png');

        //Load back of cards
        this.game.load.image('cardBack', '../../assets/cardBack.png');
    },
    create: function() {
        this.game.state.start('initialDeal');
    }
};