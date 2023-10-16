"use strict";

// Global Variables
const gridHeight = 20;
const gridWidth = 60;

// Function to generate a matrix of size gridHeight x gridWidth, holding the grid
const generateEmptyGrid = () => {
  let grid = [];
  for (let i = 0; i < gridHeight; i++) {
    grid.push([]);
    if (i === 0 || i === gridHeight - 1) {
      for (let j = 0; j < gridWidth; j++) {
        grid[i].push("#");
      }
    } else {
      grid[i].push("#");
      for (let j = 0; j < gridWidth - 2; j++) {
        grid[i].push(" ");
      }
      grid[i].push("#");
    }
  }
  return grid;
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

const getNextBallPosition = (currentPosition, moveVector) => {
  const newPosition = {
    x: currentPosition.x + moveVector.x,
    y: currentPosition.y + moveVector.y,
  };
  // Check outer bounds
  if (newPosition.x < 1 || newPosition.x >= gridHeight - 1) {
    moveVector.x = -moveVector.x;
    newPosition.x = currentPosition.x + moveVector.x;
  }
  if (newPosition.y < 1 || newPosition.y >= gridWidth - 1) {
    moveVector.y = -moveVector.y;
    newPosition.y = currentPosition.y + moveVector.y;
  }
  // Check collision with left player
  if (
    newPosition.x >= currentLeftPlayerPosition.fromY &&
    newPosition.x <= currentLeftPlayerPosition.toY &&
    newPosition.y === 6
  ) {
    moveVector.y = -moveVector.y;
    newPosition.y = currentPosition.y + moveVector.y;
  }
  // Check collision with right player
  if (
    newPosition.x >= currentRightPlayerPosition.fromY &&
    newPosition.x <= currentRightPlayerPosition.toY &&
    newPosition.y === gridWidth - 7
  ) {
    moveVector.y = -moveVector.y;
    newPosition.y = currentPosition.y + moveVector.y;
  }
  return newPosition;
};

const getNextLeftPlayerPosition = (currentPlayerPosition, moveVector) => {
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

const getNextRightPlayerPosition = (currentPlayerPosition, moveVector) => {
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

const gameLoop = () => {
  let newBallPosition = getNextBallPosition(currentBallPosition, moveVector);
  let newLeftPlayerPosition = getNextLeftPlayerPosition(
    currentLeftPlayerPosition,
    moveLeftPlayerVector
  );
  let newRightPlayerPosition = getNextRightPlayerPosition(
    currentRightPlayerPosition,
    moveRightPlayerVector
  );
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

let moveVector = { x: 1, y: 1 };
let moveLeftPlayerVector = {
  y: 0,
};
let moveRightPlayerVector = {
  y: 0,
};
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

  // Check if the user pressed the up arrow key
  if (key === UP_ARROW) {
    moveLeftPlayerVector.y = -1;
  }
  // Check if the user pressed the down arrow key
  else if (key === DOWN_ARROW) {
    moveLeftPlayerVector.y = 1;
  }

  if (key === W_KEY) {
    moveRightPlayerVector.y = -1;
  } else if (key === S_KEY) {
    moveRightPlayerVector.y = 1;
  }
});
