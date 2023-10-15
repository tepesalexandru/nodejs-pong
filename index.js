// Global Variables
const gridHeight = 20;
const gridWidth = 60;

// Function to generate a matrix of size gridHeight x gridWidth, holding the grid
const generateGrid = () => {
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

printGrid = (grid) => {
  console.clear();
  for (let i = 0; i < gridHeight; i++) {
    console.log(grid[i].join(""));
  }
};

const movePlayer = (grid, moveVector) => {
  const newPosition = {
    x: playerPosition.x + moveVector.x,
    y: playerPosition.y + moveVector.y,
  };
  // Check outer bounds
  if (newPosition.x < 1 || newPosition.x >= gridHeight - 1) {
    moveVector.x = -moveVector.x;
    newPosition.x = playerPosition.x + moveVector.x;
  }
  if (newPosition.y < 1 || newPosition.y >= gridWidth - 1) {
    moveVector.y = -moveVector.y;
    newPosition.y = playerPosition.y + moveVector.y;
  }

  // Remove the player from the grid
  grid[playerPosition.x][playerPosition.y] = " ";
  // Update the player position
  playerPosition.x = newPosition.x;
  playerPosition.y = newPosition.y;
  // Add the player to the grid
  grid[playerPosition.x][playerPosition.y] = "O";
};

const playerPosition = {
  x: 1,
  y: 1,
};

const gameLoop = () => {
  movePlayer(grid, moveVector);
  printGrid(grid);
  setTimeout(gameLoop, 35);
};

let grid = generateGrid();
let moveVector = { x: 1, y: 1 };
gameLoop();
