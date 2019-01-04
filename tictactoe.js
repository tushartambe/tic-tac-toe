const getPlayers = function() {
  firstPlayer = document.getElementById("firstPlayer").value;
  secondPlayer = document.getElementById("secondPlayer").value;
  currentPlayer = firstPlayer;
};

const winningMoves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [2, 4, 6]
];

let firstPlayerMoves = [];
let secondPlayerMoves = [];

const isSubset = function(userMoves, winningMove) {
  isPresent = function(x) {
    return userMoves.includes(x);
  };
  let checkSubset = winningMove.every(isPresent);
  return checkSubset;
};

const checkWin = function(winningMoves, playerMoves) {
  checker = isSubset.bind(null, playerMoves);
  let result = winningMoves.map(checker);
  return result;
};

const checkWinner = checkWin.bind(null, winningMoves);

const clickCell = function(cellId, event) {
  document.getElementById(event.target.id).style.pointerEvents = "none";

  if (currentPlayer == firstPlayer) {
    document.getElementById("cell_" + cellId).style.backgroundColor = "blue";
    firstPlayerMoves.push(cellId);
    isFirstPlayerWinner = checkWinner(firstPlayerMoves);

    if (isFirstPlayerWinner.includes(true)) {
      alert("you won " + firstPlayer);
    }

    currentPlayer = secondPlayer;
  } else {
    document.getElementById("cell_" + cellId).style.backgroundColor = "green";
    secondPlayerMoves.push(cellId);

    isSecondPlayerWinner = checkWinner(secondPlayerMoves);
    if (isSecondPlayerWinner.includes(true)) {
      alert("you won " + secondPlayer);
    }
    currentPlayer = firstPlayer;
  }
};
