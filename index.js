// Create a 10 x 10 grid
const gridHeight = 20;
const gridWidth = 60;

console.log("#".repeat(gridWidth));
for (let i = 0; i < gridHeight - 2; i++) {
  console.log("#" + " ".repeat(gridWidth - 2) + "#");
}
console.log("#".repeat(gridWidth));
