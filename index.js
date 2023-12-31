"use strict";

// Global Variables
const gridHeight = 20;
const gridWidth = 60;

const generateGameOverText = () => {
  const gameOverText = `
  ███▀▀▀██┼███▀▀▀███┼███▀█▄█▀███┼██▀▀▀
  ██┼┼┼┼██┼██┼┼┼┼┼██┼██┼┼┼█┼┼┼██┼██┼┼┼
  ██┼┼┼▄▄▄┼██▄▄▄▄▄██┼██┼┼┼▀┼┼┼██┼██▀▀▀
  ██┼┼┼┼██┼██┼┼┼┼┼██┼██┼┼┼┼┼┼┼██┼██┼┼┼
  ███▄▄▄██┼██┼┼┼┼┼██┼██┼┼┼┼┼┼┼██┼██▄▄▄
  ┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼
  ███▀▀▀███┼▀███┼┼██▀┼██▀▀▀┼██▀▀▀▀██▄┼
  ██┼┼┼┼┼██┼┼┼██┼┼██┼┼██┼┼┼┼██┼┼┼┼┼██┼
  ██┼┼┼┼┼██┼┼┼██┼┼██┼┼██▀▀▀┼██▄▄▄▄▄▀▀┼
  ██┼┼┼┼┼██┼┼┼██┼┼█▀┼┼██┼┼┼┼██┼┼┼┼┼██┼
  ███▄▄▄███┼┼┼─▀█▀┼┼─┼██▄▄▄┼██┼┼┼┼┼██▄
  `;
  return gameOverText;
};

// Function to generate a matrix of size gridHeight x gridWidth, holding the grid
const generateEmptyGrid = () => {
  const row = Array(gridWidth - 2)
    .fill(" ")
    .join("");
  const topBottomRow = Array(gridWidth).fill("#").join("");
  const middleRows = Array(gridHeight - 2).fill(`#${row}#`);
  const grid = [topBottomRow, ...middleRows, topBottomRow];
  return grid.map((row) => row.split(""));
};

const printGrid = (grid) => {
  console.clear();
  for (let i = 0; i < gridHeight; i++) {
    console.log(grid[i].join(""));
  }
};

const updateBallGridPosition = (grid, oldBallPosition, newBallPosition) => {
  // Remove the player from the grid
  grid[oldBallPosition.x][oldBallPosition.y] = " ";
  // Add the player to the grid
  grid[newBallPosition.x][newBallPosition.y] = "O";
};

const checkCollisionWithPlayer = (ballPosition, playerPosition) => {
  if (
    ballPosition.x >= playerPosition.fromY &&
    ballPosition.x <= playerPosition.toY &&
    ballPosition.y === playerPosition.column
  ) {
    return true;
  }
  return false;
};

const getNextBallPosition = (currentPosition, moveVector) => {
  const newBallPosition = {
    x: currentPosition.x + moveVector.x,
    y: currentPosition.y + moveVector.y,
  };
  // Check outer bounds
  if (newBallPosition.x < 1 || newBallPosition.x >= gridHeight - 1) {
    moveVector.x = -moveVector.x;
    newBallPosition.x = currentPosition.x + moveVector.x;
  }
  if (newBallPosition.y < 1) {
    score.right++;
    newBallPosition.y = gridWidth / 2;
    newBallPosition.x = gridHeight / 2;
    ballMoveVector.x = -ballMoveVector.x;
    ballMoveVector.y = -ballMoveVector.y;
  } else if (newBallPosition.y >= gridWidth - 1) {
    score.left++;
    newBallPosition.y = gridWidth / 2;
    newBallPosition.x = gridHeight / 2;
    ballMoveVector.x = -ballMoveVector.x;
    ballMoveVector.y = -ballMoveVector.y;
  }
  // Check collision with left player
  if (checkCollisionWithPlayer(newBallPosition, currentLeftPlayerPosition)) {
    moveVector.y = -moveVector.y;
    newBallPosition.y = currentPosition.y + moveVector.y;
  }
  // Check collision with right player
  if (checkCollisionWithPlayer(newBallPosition, currentRightPlayerPosition)) {
    moveVector.y = -moveVector.y;
    newBallPosition.y = currentPosition.y + moveVector.y;
  }
  return newBallPosition;
};

const getNextPlayerPosition = (currentPlayerPosition, moveVector) => {
  const newPosition = {
    fromY: currentPlayerPosition.fromY + moveVector.y,
    toY: currentPlayerPosition.toY + moveVector.y,
    column: currentPlayerPosition.column,
  };
  // Check outer bounds
  if (newPosition.fromY < 1 || newPosition.toY >= gridHeight - 1) {
    newPosition.fromY = currentPlayerPosition.fromY;
    newPosition.toY = currentPlayerPosition.toY;
  }
  return newPosition;
};

const updatePlayerGridPosition = (
  grid,
  oldPlayerPosition,
  newPlayerPosition
) => {
  // Remove the player from the grid
  for (let i = oldPlayerPosition.fromY; i <= oldPlayerPosition.toY; i++) {
    grid[i][oldPlayerPosition.column] = " ";
  }
  // Add the player to the grid
  for (let i = newPlayerPosition.fromY; i <= newPlayerPosition.toY; i++) {
    grid[i][oldPlayerPosition.column] = "X";
  }
};

const gameLoop = () => {
  if (isGameOver) {
    console.clear();
    console.log(generateGameOverText());
    console.log("Press R to restart the game");
    setTimeout(gameLoop, 35);
    return;
  }
  let newLeftPlayerPosition = getNextPlayerPosition(
    currentLeftPlayerPosition,
    leftPlayerMoveVector
  );
  let newRightPlayerPosition = getNextPlayerPosition(
    currentRightPlayerPosition,
    rightPlayerMoveVector
  );
  let newBallPosition = getNextBallPosition(
    currentBallPosition,
    ballMoveVector
  );
  if (
    score.left === POINTS_NEEDED_TO_WIN ||
    score.right === POINTS_NEEDED_TO_WIN
  ) {
    isGameOver = true;
  }
  updatePlayerGridPosition(
    grid,
    currentLeftPlayerPosition,
    newLeftPlayerPosition
  );
  updatePlayerGridPosition(
    grid,
    currentRightPlayerPosition,
    newRightPlayerPosition
  );
  updateBallGridPosition(grid, currentBallPosition, newBallPosition);
  currentBallPosition = newBallPosition;
  currentLeftPlayerPosition = newLeftPlayerPosition;
  currentRightPlayerPosition = newRightPlayerPosition;
  printGrid(grid);
  console.log("Score: ", score);
  setTimeout(gameLoop, 35);
};

let grid = generateEmptyGrid();
let currentBallPosition = {
  x: 10,
  y: 10,
};
let currentLeftPlayerPosition = {
  fromY: 1,
  toY: 4,
  column: 6,
};
let currentRightPlayerPosition = {
  fromY: 1,
  toY: 4,
  column: gridWidth - 7,
};

let ballMoveVector = { x: 1, y: 1 };
let leftPlayerMoveVector = {
  y: 0,
};
let rightPlayerMoveVector = {
  y: 0,
};
let score = {
  left: 0,
  right: 0,
};
let isGameOver = false;
const POINTS_NEEDED_TO_WIN = 1;
gameLoop();

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding("utf8");

// on any data into stdin
stdin.on("data", function (key) {
  // ctrl-c ( end of text )
  if (key === "\u0003") {
    process.exit();
  }

  const UP_ARROW = "\u001B\u005B\u0041";
  const DOWN_ARROW = "\u001B\u005B\u0042";

  const W_KEY = "\u0077";
  const S_KEY = "\u0073";
  const R_KEY = "\u0072";

  // Check if the user pressed the up arrow key
  if (key === UP_ARROW) {
    leftPlayerMoveVector.y = -1;
  }
  // Check if the user pressed the down arrow key
  else if (key === DOWN_ARROW) {
    leftPlayerMoveVector.y = 1;
  }

  if (key === W_KEY) {
    rightPlayerMoveVector.y = -1;
  } else if (key === S_KEY) {
    rightPlayerMoveVector.y = 1;
  }

  if (key == R_KEY && isGameOver) {
    isGameOver = false;
    score.left = 0;
    score.right = 0;

    // Reset player positions
    currentLeftPlayerPosition = {
      fromY: 1,
      toY: 4,
      column: 6,
    };

    currentRightPlayerPosition = {
      fromY: 1,
      toY: 4,
      column: gridWidth - 7,
    };

    grid = generateEmptyGrid();
    leftPlayerMoveVector = {
      y: 0,
    };
    rightPlayerMoveVector = {
      y: 0,
    };
  }
});
