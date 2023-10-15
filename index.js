// Create a 10 x 10 grid
const gridHeight = 20;
const gridWidth = 60;

// Variable to hold the grid
const generateGrid = () => {
  let grid = "";
  grid += "#".repeat(gridWidth) + "\n";
  for (let i = 0; i < gridHeight - 2; i++) {
    grid += "#" + " ".repeat(gridWidth - 2) + "#" + "\n";
  }
  grid += "#".repeat(gridWidth) + "\n";
  return grid;
};

printGrid = () => {
  console.log(generateGrid());
};

printGrid();
