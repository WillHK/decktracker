var HLW = require('hearthstone-log-watcher');
var hlw = new HLW();
var deck  = ['Backstab', 'Backstab', 'Deadly Poison', 'Deadly Poison', 'Sinister Strike', 'Sinister Strike', 'Stonetusk Boar', 'Stonetusk Boar', 'Eviscerate', 'Sap', 'Sap', 'Shiv', 'Shiv', 'Defias Ringleader', 'Defias Ringleader', "Perdition's Blade", 'Fan of Knives', 'Fan of Knives', 'SI:7 Agent', 'Silverback Patriarch', 'Wolfrider', "Assassin's Blade", "Assassin's Blade", 'Assassinate', 'Assassinate', "Lord of the Arena", 'Lord of the Arena', 'Sprint', 'Sprint', 'Ravenholdt Assassin' ];

hlw.on('game-start', function(players) {
  console.log('GAME STARTED');
  players.forEach(function(player) {
    if (player.team === 'FRIENDLY') {
      console.log('Friendly (local) player is %s', player.name);
    }
  });
});

hlw.on('zone-change', function(data) {
  //console.log('%s has moved to %s %s', data.cardName, data.team, data.zone);
  if (data.zone === 'HAND' && data.team === 'FRIENDLY') {
    var singleCardCounter = 0;
    deck.map(function(card) {
      if( data.cardName === card && singleCardCounter == 0) {
        var index = deck.indexOf(card);
        deck.splice(index, 1);
      }
    });
    console.log(deck);
  }
  if (data.zone === 'DECK' && data.team === 'FRIENDLY') {
    deck.push(data.cardName);
  }
});

hlw.on('game-over', function(players) {
  console.log('Game over!');
  players.forEach(function(player) {
    if (player.status === 'WON') {
      console.log('The winner is %s!', player.name)
    }
  });
});

hlw.start();
