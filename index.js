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
  for (let i = 0; i < gridHeight; i++) {
    console.log(grid[i].join(""));
  }
};

const movePlayer = (grid) => {
  const newPosition = {
    x: playerPosition.x + 1,
    y: playerPosition.y,
  };
  console.log(newPosition);
  // Remove the player from the grid
  grid = grid.replace("O", " ");
  // Update the player position
  playerPosition.x = newPosition.x;
  playerPosition.y = newPosition.y;
  // Add the player to the grid
  grid[gridWidth * playerPosition.x + playerPosition.y] = "O";
  printGrid(grid);
};

const playerPosition = {
  x: 1,
  y: 1,
};

// const gameLoop = () => {
//   let grid = generateGrid();
//   printGrid(grid);
//   movePlayer(grid);
//   setTimeout(gameLoop, 1000);
// };

// gameLoop();
printGrid(generateGrid());
