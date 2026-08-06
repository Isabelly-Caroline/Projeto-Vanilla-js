const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restart');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

function initializeGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  updateStatusDisplay();
}

function cellClicked() {
  const cellIndex = this.getAttribute('data-index');

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  updateStatusDisplay();
}

function updateStatusDisplay() {
  const playerClass = currentPlayer === "X" ? "player-x" : "player-o";
  statusText.innerHTML = `Vez do jogador: <span class="${playerClass}">${currentPlayer}</span>`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winnerClass = currentPlayer === "X" ? "player-x" : "player-o";
    statusText.innerHTML = `🎉 Jogador <span class="${winnerClass}">${currentPlayer}</span> venceu!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.innerHTML = `🤝 Empate!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  updateStatusDisplay();
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('x', 'o');
  });
  running = true;
}

initializeGame();