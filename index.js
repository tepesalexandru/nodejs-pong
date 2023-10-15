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
  return newPosition;
};

const gameLoop = () => {
  let newBallPosition = getNextBallPosition(currentBallPosition, moveVector);
  updateBallGridPosition(grid, currentBallPosition, newBallPosition);
  currentBallPosition = newBallPosition;
  printGrid(grid);
  setTimeout(gameLoop, 35);
};

let grid = generateEmptyGrid();
let currentBallPosition = {
  x: 1,
  y: 1,
};
let moveVector = { x: 1, y: 1 };
gameLoop();
