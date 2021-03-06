// Get button & canvas id
var buttonLeft = document.getElementById('leftbutton');
var buttonRight = document.getElementById('rightbutton');
var ctx = document.getElementById('chart').getContext('2d');

// Add game data
var Game = function(gameTitle, gameSource) {
  this.gameSource = gameSource;
  this.gameTitle = gameTitle;

  this.write = function() {
    var writeImgSrc = '<img src="' + this.gameSource + '"/>';

    console.log(gameTitle + ' | ' + gameSource); // Test gameTitle & gameSource
    return writeImgSrc;
  };
};

// Game files
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
  new Game('Zelda: Ocarina of Time', 'img/zelda.jpg')];

//=================================================================

// Track votes & calculations
var tracker = {
  votes: Array(gameFiles.length).fill(0),
  
  randomGames: function() {
    return Math.floor(Math.random() * gameFiles.length);
  }
};

//=================================================================

// Local storage
var voteStorage;

// Get local storage
var getVoteStorage = localStorage.getItem('setVoteStorage');

// Parse local storage
if (localStorage.getItem('setVoteStorage')) {
  tracker.votes = JSON.parse(getVoteStorage);
}

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

  // Convert JS object to JSON
  voteStorage = JSON.stringify(this.votes);

  // Set item to local storage
  localStorage.setItem('setVoteStorage', voteStorage);
};

//=================================================================

// Chart game data
tracker.updateChart = function() {
  var data = {
    labels: label,
    datasets: dataset
  };

  // Create chart
  var chart = new Chart(ctx).Bar(data, options);
};

// Chart labels
var label = [];
for(var i = 0; i < gameFiles.length; i++) {
  label.push(gameFiles[i].gameTitle);
}

// Chart datasets
var dataset = [{
  data: tracker.votes,
  fillColor: 'black',
  strokeColor: 'black'
}];

// Chart options
var options = {
  scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
  scaleFontColor: 'white',
  scaleShowGridLines: true,
  scaleGridLineColor: 'black',
  fillcolor: 'black',
  animationSteps: 75
};

//=================================================================

// Load random games from returnRandomGames
tracker.loadGames = function() {
  tracker.useRandomGames = tracker.returnRandomGames();
  buttonLeft.innerHTML = gameFiles[this.useRandomGames[0]].write();
  buttonRight.innerHTML = gameFiles[this.useRandomGames[1]].write();

  // Run updateChart
  this.updateChart();
};

//=================================================================

// Buttons
buttonLeft.addEventListener('click', function() {
  tracker.addVote(tracker.useRandomGames[0]); 
  tracker.loadGames();
});

buttonRight.addEventListener('click', function() {
  tracker.addVote(tracker.useRandomGames[1]); 
  tracker.loadGames();
});

//=================================================================

// Run
tracker.loadGames();
