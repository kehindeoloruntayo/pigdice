$(document).ready(function () {
  const score0Element = $('#score--0');
  const score1Element = $('#score--1');
  const playerZero = $('.player--0');
  const playerOne = $('.player--1');
  const playerZeroScores = $('#current--0');
  const playerOneScores = $('#current--1');

  const diceImg = $('.dice');
  const newGame = $('.btn--new');
  const rollDice = $('.btn--roll');
  const holdDice = $('.btn--hold');

  let scores, currentScore, activePlayer, playing;

  const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.text(0);
    score1Element.text(0);
    playerZeroScores.text(0);
    playerOneScores.text(0);
    diceImg.addClass('hidden');
    playerZero.removeClass('player--winner');
    playerOne.removeClass('player--winner');
    playerZero.addClass('player--active');
    playerOne.removeClass('player--active');
  };

  init();

  const playerSwitching = function () {
    $(`#current--${activePlayer}`).text(0);
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerZero.toggleClass('player--active');
    playerOne.toggleClass('player--active');
  };

  rollDice.on('click', function () {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceImg.removeClass('hidden');
      diceImg.attr('src', `./img/dice-${dice}.png`);
      if (dice !== 1) {
        currentScore += dice;
        $(`#current--${activePlayer}`).text(currentScore);
      } else {
        playerSwitching();
      }
    }
  });

  holdDice.on('click', function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      $(`#score--${activePlayer}`).text(scores[activePlayer]);
      if (scores[activePlayer] >= 100) {
        playing = false;
        $(`.player--${activePlayer}`).addClass('player--winner');
        $(`.player--${activePlayer}`).removeClass('player--active');
        diceImg.addClass('hidden');
      } else {
        playerSwitching();
      }
    }
  });

  newGame.on('click', init);
});