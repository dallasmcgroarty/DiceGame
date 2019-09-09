/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gameActive;

init();

document.querySelector('.btn-roll').addEventListener('click', function (event) {
  event.preventDefault();
  if (gameActive) {
    var dice = Math.floor(Math.random() * 6) + 1;

    // display result
    var diceObject = document.querySelector('.dice');
    diceObject.style.display = 'block';
    diceObject.src = 'dice-' + dice + '.png';

    // update the round score IF the rolled number was not a 1 (1 means reset score)
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function (event) {
  event.preventDefault();
  if (gameActive) {
    // add current score to the user total score
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      // turn game functions off
      gameActive = false;
    } else {
      // go to next Player
      nextPlayer();
    }
  }
});

// create new game
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer () {
  if (activePlayer === 0) { activePlayer = 1; } else { activePlayer = 0; }
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

// initialize game state
function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameActive = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
