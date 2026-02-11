// week 4 side quest: data-driven level using arrays + loops
// tiles: 0 floor, 1 wall, 2 goal, 3 player start

let tileSize = 40;

let levels = [
  {
    name: "level 1",
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    name: "level 2",
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];

let levelIndex = 0;
let grid = [];

let playerR = 0;
let playerC = 0;

function setup() {
  loadLevel(0);
}

function draw() {
  background(255, 210, 230);

  drawGrid();
  drawPlayer();
  drawHud();
}

function loadLevel(idx) {
  levelIndex = idx;

  grid = copyGrid(levels[levelIndex].grid);

  createCanvas(grid[0].length * tileSize, grid.length * tileSize);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 3) {
        playerR = r;
        playerC = c;
        grid[r][c] = 0;
      }
    }
  }
}

function copyGrid(source) {
  // simple deep copy for a 2d array of numbers
  let result = [];
  for (let r = 0; r < source.length; r++) {
    result[r] = [];
    for (let c = 0; c < source[r].length; c++) {
      result[r][c] = source[r][c];
    }
  }
  return result;
}

function drawGrid() {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let t = grid[r][c];

      if (t === 1) fill(190, 70, 140);
      else if (t === 2) fill(255, 245, 250);
      else fill(255, 170, 210);

      stroke(255);
      rect(c * tileSize, r * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  noStroke();
  fill(60, 20, 40);
  rect(
    playerC * tileSize + 8,
    playerR * tileSize + 8,
    tileSize - 16,
    tileSize - 16,
    6,
  );
}

function drawHud() {
  fill(60, 20, 40);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(levels[levelIndex].name, 8, 8);
  text("use arrow keys", 8, 26);
}

function keyPressed() {
  let newR = playerR;
  let newC = playerC;

  if (keyCode === LEFT_ARROW) newC--;
  if (keyCode === RIGHT_ARROW) newC++;
  if (keyCode === UP_ARROW) newR--;
  if (keyCode === DOWN_ARROW) newR++;

  // bounds check
  if (newR < 0 || newR >= grid.length || newC < 0 || newC >= grid[0].length) {
    return;
  }

  // wall collision
  if (grid[newR][newC] === 1) {
    return;
  }

  // move
  playerR = newR;
  playerC = newC;

  // goal check
  if (grid[playerR][playerC] === 2) {
    nextLevel();
  }
}

function nextLevel() {
  let next = levelIndex + 1;
  if (next < levels.length) {
    loadLevel(next);
  } else {
    // restart if finished
    loadLevel(0);
  }
}
