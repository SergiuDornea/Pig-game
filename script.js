'use strict';
// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Starting conditions
let scores;
let currentScore;
let activePlayer;
let playing;
const init = function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
};
init();
//Swich player function
const swichPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    //Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    //Change bg
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        //Genarate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //Check for rolled 1 : if true, swich to next player
        if (dice !== 1) {
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;

            //Add dice to current score
        } else {
            //score reset
            swichPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        //Add current score to active player's score
        scores[activePlayer] += currentScore;
        //scores[1] = scores[1]+ currentScore
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //Check score >= 100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            //Swich to next player
            swichPlayer();
        }
    }
});

btnNew.addEventListener('click', init);