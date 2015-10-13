// Global Variables
var numberOfGames = [1, 2, 3, 4];
var gamez = ['img/contra.jpg', 'img/ff7.jpg', 'img/metroid.gif'];

//=================================================================

// Calculations
randomGames = function(min, max) {
  return Math.floor(Math.random() * (numberOfGames[3] - numberOfGames[0]) + numberOfGames[0]);
};

//=================================================================

// Objects with properties
function Games() {
  randomGames(numberOfGames[3], numberOfGames[0]);
  console.log(randomGames()); // Test calculation
  console.log(numberOfGames); // Test list

  for (var i = 0; i < numberOfGames.length; i++) { 
    if (parseInt[i] == randomGames) {
      console.log(parseInt[i]); // Test loop
      var createImg = document.createElement('IMG');
      createImg.src = i;
      document.getElementById('left').appendChild(createImg);
    };
  };
};

//=================================================================

// Run
Games(numberOfGames);
