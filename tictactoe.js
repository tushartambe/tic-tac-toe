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
let movesMade = [];
const contains = function(list, element) {
  return list.includes(element);
};

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
  return result.includes(true);
};

const checkWinner = checkWin.bind(null, winningMoves);

const announceWinner = function(player) {
  document.getElementById("winner").innerHTML =
    "Game finished! " + "Winner is " + player + "!!";
  document.getElementById("allcells").onclick = null;
};

const announceDraw = function() {
  document.getElementById("winner").innerHTML =
    "Game finished! " + "Result is draw!!";
  document.getElementById("whoseMove").innerHTML = "";
};

const whoseMove = function(player) {
  document.getElementById("whoseMove").innerHTML = "Your Turn  :" + player;
};

const getPlayers = function() {
  firstPlayer = document.getElementById("firstPlayer").value;
  secondPlayer = document.getElementById("secondPlayer").value;
  if (firstPlayer == secondPlayer) {
    firstPlayer = document.getElementById("firstPlayer").id;
    secondPlayer = document.getElementById("secondPlayer").id;
    // firstPlayer =
    //   firstPlayer + " " + document.getElementById("firstPlayer").value;
    // secondPlayer =
    //   secondPlayer + " " + document.getElementById("secondPlayer").value;
    currentPlayer = firstPlayer;
  } else {
    currentPlayer = firstPlayer;
  }
};

const getBoard = function() {
  document.getElementById("instructions").style.display = "none";
  document.getElementById("getPlayers").style.display = "none";
  document.getElementById("tictactoeBoard").style.display = "block";
  whoseMove(currentPlayer);
};

const isDraw = function(firstPlayerWinState, secondPlayerWinState) {
  return !firstPlayerWinState && !secondPlayerWinState;
};

const clickCell = function(event) {
  let cellId = +event.target.id.replace("cell_", "");
  if (contains(movesMade, cellId)) {
    return;
  }
  movesMade.push(cellId);

  if (currentPlayer == firstPlayer) {
    document.getElementById("cell_" + cellId).innerHTML = "X";
    firstPlayerMoves.push(cellId);
    isFirstPlayerWinner = checkWinner(firstPlayerMoves);

    if (isFirstPlayerWinner) {
      announceWinner(firstPlayer);
    }

    whoseMove(secondPlayer);
    currentPlayer = secondPlayer;
  } else {
    document.getElementById("cell_" + cellId).innerHTML = "O";

    secondPlayerMoves.push(cellId);

    isSecondPlayerWinner = checkWinner(secondPlayerMoves);
    if (isSecondPlayerWinner) {
      announceWinner(secondPlayer);
    }
    whoseMove(firstPlayer);
    currentPlayer = firstPlayer;
  }

  if (
    movesMade.length == 9 &&
    isDraw(isFirstPlayerWinner, isSecondPlayerWinner)
  ) {
    announceDraw();
  }
};
