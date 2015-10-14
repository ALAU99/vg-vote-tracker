// Get chart id
var chart = document.getElementById('chart');

// Add game data
var Game = function(gameTitle, gameSource) {
  this.gameSource = gameSource;
  this.gameTitle = gameTitle;

  this.write = function() {
    var writeImgSrc = '<img src="' + this.gameSource + '"/>';

    console.log('Left: ' + gameTitle + ' | ' + gameSource); // Test gameTitle & gameSource
    return writeImgSrc;
  };
};

// Game data
var gameFiles = [
  new Game('Goldeneye 007', 'img/007.jpg'),
  new Game('Contra', 'img/contra.jpg'),
  new Game('Doom', 'img/doom.jpg'),
  new Game('Earthbound', 'img/earthbound.png'),
  new Game('Final Fantasy 7', 'img/ff7.jpg'),
  new Game('Gauntlet', 'img/gauntlet.jpg'),
  new Game('Kirby\'s Adventure', 'img/kirby.jpg'),
  new Game('Super Mario 64', 'img/mario.jpg'),
  new Game('Metal gear Solid', 'img/metalgear.jpg'),
  new Game('Ninja Gaiden', 'img/ninjagaiden.jpg'),
  new Game('Pac-Man', 'img/pacman.gif'),
  new Game('Street Fighter 2', 'img/streetfighter.jpg'),
  new Game('The Legend of Zelda', 'img/zelda.gif'),
  new Game('The Legend of Zelda: Ocarina of Time', 'img/zelda.jpg')];

// Track votes & calculations
var tracker = {
  votes: Array(gameFiles.length).fill(0),

  randomGames: function() {
    return Math.floor(Math.random() * gameFiles.length);
  }
};

//=================================================================

// Create random generated games
tracker.returnRandomGames = function() {
  var randomGameLeft = this.randomGames();
  var randomGameRight = this.randomGames();

  if (randomGameLeft === randomGameRight) {
    randomGameRight = this.randomGames();
  }
  if (randomGameLeft !== randomGameRight) {
    console.log('Left: ' + randomGameLeft); // Test random generated game
    console.log('Right: ' + randomGameRight); // Test random generated game
    return [randomGameLeft, randomGameRight];
  }
};

//=================================================================

// Add vote to game
tracker.addVote = function(index) {
  this.votes[index] += 1; 
};

//=================================================================

// Update chart
tracker.updateChart = function() {
  var writeImgSrc = '';

  for (var i = 0; i < gameFiles.length; i++) {
    writeImgSrc += 'Votes ' + i + ': ' + this.votes[i] + '<br>';
  }

  chart.innerHTML = writeImgSrc;
};

//=================================================================

// Load random games from returnRandomGames
tracker.loadGames = function() {
  tracker.useRandomGames = tracker.returnRandomGames();
  leftbutton.innerHTML = gameFiles[this.useRandomGames[0]].write();
  rightbutton.innerHTML = gameFiles[this.useRandomGames[1]].write();
  
  // Run updateChart
  this.updateChart();
};

//=================================================================

// Buttons
leftbutton.addEventListener('click', function() {
  tracker.addVote(tracker.useRandomGames[0]); 
  tracker.loadGames();
});

rightbutton.addEventListener('click', function() {
  tracker.addVote(tracker.useRandomGames[1]); 
  tracker.loadGames();
});

//=================================================================

// Run
tracker.loadGames();
