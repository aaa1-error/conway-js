const SIZE = 48;
var Field = [];

function initializeLife() {
  Field = [];

  for (let r = 0; r < SIZE; r++) {
    Field[r] = []
    for (let c = 0; c < SIZE; c++) {
      Field[r][c] = false;
    }
  }
}

function initializeGrid() {
  let grid = document.getElementsByTagName("table")[0];

  for (let r = 0; r < SIZE; r++) {
    let row = document.createElement('tr');
    grid.appendChild(row);

    for (let c = 0; c < SIZE; c++) {
      let cell = document.createElement('td');

      cell.onclick = () => {
        Field[r][c] = !Field[r][c];

        if (Field[r][c]) {
          cell.classList.add('alive')
        } else {
          cell.classList.remove('alive')
        }
      }

      row.appendChild(cell)
    }
  }
}

function renderField() {
  let grid = document.getElementsByTagName("table")[0];

  for (let r = 0, row; row = grid.rows[r]; r++) {
    for (let c = 0, cell; cell = row.cells[c]; c++) {
      if(Field[r][c] == true) {
        cell.classList.add('alive')
      } else {
        cell.classList.remove('alive')
      }
    }
  }
}

function decideState(y, x) {
  let yStart = y - 1 < 0 ? 0 : y - 1,
    yEnd = y + 1 >= SIZE ? y : y + 1;

  let xStart = x - 1 < 0 ? 0 : x - 1,
    xEnd = x + 1 >= SIZE ? x : x + 1;

  let aliveNeighbours = 0;

  for (let yi = yStart; yi <= yEnd; yi++) {
    for (let xi = xStart; xi <= xEnd; xi++) {
      if (yi == y && xi == x) continue;

      if (Field[yi][xi]) aliveNeighbours++;
      if (aliveNeighbours == 4) break;
    }
  }

  if (Field[y][x] == true) {
    if (aliveNeighbours >= 2 && aliveNeighbours <= 3) return true
    else return false
  } else {
    if (aliveNeighbours == 3) return true;
  }

  return Field[y][x];
}

function update() {
  let nextGeneration = []

  for (let r = 0; r < SIZE; r++) {
    nextGeneration[r] = [];
    for (let c = 0; c < SIZE; c++) {
      nextGeneration[r][c] = decideState(r, c);
    }
  }

  Field = nextGeneration;
}

let intervalTime = 300;
let interval;

function tick() {
  update();
  renderField();
}

function onLoad() {
  initializeLife();
  initializeGrid();
}

function start() {
  interval = setInterval(tick, intervalTime)
  
}

function stop() {
  clearInterval(interval);
}

function wipeOut() {
  stop();
  initializeLife();
  start();
}

function speedUp() {
  stop();
  interval -= 100;

  if(interval < 50) interval = 100;
  start();
}

function slowDown() {
  stop();
  interval += 100;

  if(interval > 1000) interval = 1000;
  start();
}