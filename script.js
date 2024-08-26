let scores = [0, 0];
let currentScores = [0, 0];
let activePlayer = 0;
let playing = true;
let rollCount = 0;
const maxRollsPerTurn = 2;


const current1El = document.getElementById("current1");
const current2El = document.getElementById("current2");
const total1El = document.getElementById("total1");
const total2El = document.getElementById("total2");
const rollBtn = document.getElementById("roll");
const holdBtn = document.getElementById("hold");
const newBtn = document.getElementById("new");
const diceEl = document.getElementById("dice");


const switchPlayer = () => {
  currentScores[activePlayer] = 0;
  document.getElementById(
    `current${activePlayer + 1}`
  ).textContent = `Current score: ${currentScores[activePlayer]}`;
  activePlayer = activePlayer === 0 ? 1 : 0;
  rollCount = 0;
  rollBtn.disabled = false;
};


const rollDice = () => {
  if (playing && rollCount < maxRollsPerTurn) {
    const dice = Math.floor(Math.random() * 6) + 1;

    
    diceEl.textContent = dice;

    if (dice !== 1) {
      currentScores[activePlayer] += dice;
      document.getElementById(
        `current${activePlayer + 1}`
      ).textContent = `Current score: ${currentScores[activePlayer]}`;
      rollCount++;
      if (rollCount >= maxRollsPerTurn) {
        rollBtn.disabled = true;
      }
    } else {
      switchPlayer();
    }
  } else if (rollCount >= maxRollsPerTurn) {
    alert(
      "You have reached the maximum roll limit for this turn. Please hold your score."
    );
  }
};


const holdScore = () => {
  if (playing) {
    scores[activePlayer] += currentScores[activePlayer];
    document.getElementById(
      `total${activePlayer + 1}`
    ).textContent = `Total score: ${scores[activePlayer]}`;
    currentScores[activePlayer] = 0;
    document.getElementById(
      `current${activePlayer + 1}`
    ).textContent = `Current score: ${currentScores[activePlayer]}`;

    if (scores[activePlayer] >= 20) {
      alert(`Player ${activePlayer + 1} wins!`);
      playing = false;
    } else {
      switchPlayer();
    }
  }
};


const newGame = () => {
  scores = [0, 0];
  currentScores = [0, 0];
  activePlayer = 0;
  playing = true;
  rollCount = 0;
  diceEl.textContent = "1";
  document.getElementById("total1").textContent = "Total score: 0";
  document.getElementById("total2").textContent = "Total score: 0";
  document.getElementById("current1").textContent = "Current score: 0";
  document.getElementById("current2").textContent = "Current score: 0";
  rollBtn.disabled = false;
};

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newBtn.addEventListener("click", newGame);
