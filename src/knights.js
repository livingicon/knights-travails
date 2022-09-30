// VARIABLES
const chssBrd = [];
const moves = []; // fifo queue
const gameBoard = 
  [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],// 0-7
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], // 8-15
  [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], // 16-23
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], // 24-31
  [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], // 32-39
  [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], // 40-47
  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], // 48-55
  [0,0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]  // 56-63
];


// CONSTRUCTOR
class Vertex {
  constructor(location) {
    this.location = location;
    this.box = gameBoard[location];
    this.dist = null;
    this.pred = null; 
  }
}


// PATH FUNCTION

const knightMoves = function(start, end) {
  if (start[0] > 7 || start[0] < 0 || start[1] > 7 || start[1] < 0) {
    alert("Your knight isn't on the board.");
  } else if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
    alert("Your knight can't move off of the board.");
  } else {
    let path = [];
    let a = arrToIndex(start);
    let b = arrToIndex(end);
    movesTree(a);
    let previous = chssBrd[b];
    path.push(previous.box);
    while (previous.pred) {
      previous = previous.pred;
      path.unshift(previous.box);
    }
    console.log(` => You made it in ${path.length - 1} moves! Here's your path: `);
    path.forEach((box) => {
      console.log(`[${box}]`)
    })
  }
};


// HELPER FUNCTIONS

const createChessBoard = function(vertex = null) {
  for (let i = 0; i < 64; i++) {
    vertex = new Vertex(i)
    chssBrd.push(vertex);
  }
};

const arrToIndex = function(y) {
  for (let i = 0; i < chssBrd.length; i++) {
    if (chssBrd[i].box[0] === y[0] && chssBrd[i].box[1] === y[1]) {
      return i;
    }
  }
};

const movesTree = function(startVertex) {
  chssBrd[startVertex].dist = 0; // make it 0
  possibleNextMoves(startVertex);
  while (moves.length) {
    possibleNextMoves(moves.shift());
  }
};

const possibleNextMoves = function(x) {
  (x > 16 && x !== 24 && x !== 32 && x !== 40 && x !== 48 && x !== 56 && x <= 63 && 
    chssBrd[x-17].dist === null) ? (chssBrd[x-17].pred = chssBrd[x], chssBrd[x-17].dist 
    = chssBrd[x].dist + 1, moves.push(chssBrd[x-17].location)) : null; // up2-left1

  (x > 15 && x !== 23 && x !== 31 && x !== 39 && x !== 47 && x !== 55 && x < 63 && 
    chssBrd[x-15].dist === null) ? (chssBrd[x-15].pred = chssBrd[x], chssBrd[x-15].dist 
    = chssBrd[x].dist + 1, moves.push(chssBrd[x-15].location)) : null; // up2-right1

  (x > 7 && x < 14 && chssBrd[x-6].dist === null|| x > 15 && x < 22 && chssBrd[x-6].dist 
    === null || x > 23 && x < 30 && chssBrd[x-6].dist === null || x > 31 && x < 38 && 
    chssBrd[x-6].dist === null || x > 39 && x < 46 && chssBrd[x-6].dist === null || x > 47 
    && x < 54 && chssBrd[x-6].dist === null || x > 55 && x < 62 && chssBrd[x-6].dist 
    === null) ? (chssBrd[x-6].pred = chssBrd[x], chssBrd[x-6].dist = chssBrd[x].dist + 1, 
    moves.push(chssBrd[x-6].location)) : null;// right2-up1

  (x >= 0 && x < 6 && chssBrd[x+10].dist === null || x > 7 && x < 14 && chssBrd[x+10].dist
    === null || x > 15 && x < 22 && chssBrd[x+10].dist === null || x > 23 && x < 30 && 
    chssBrd[x+10].dist === null || x > 31 && x < 38 && chssBrd[x+10].dist === null || 
    x > 39 && x < 46 && chssBrd[x+10].dist === null || x > 47 && x < 54 && 
    chssBrd[x+10].dist === null) ? (chssBrd[x+10].pred = chssBrd[x], chssBrd[x+10].dist = 
    chssBrd[x].dist + 1 , moves.push(chssBrd[x+10].location)) : null; // right2-down1

  (x >= 0 && x < 7 && chssBrd[x+17].dist === null || x > 7 && x < 15 && chssBrd[x+17].dist
    === null || x > 15 && x < 23 && chssBrd[x+17].dist === null || x > 23 && x < 31 
    && chssBrd[x+17].dist === null || x > 31 && x < 39 && chssBrd[x+17].dist === null || 
    x > 39 && x < 47 && chssBrd[x+17].dist === null) ? (chssBrd[x+17].pred = chssBrd[x], 
    chssBrd[x+17].dist = chssBrd[x].dist + 1, moves.push(chssBrd[x+17].location)) : null; // down2-right1

  (x > 0 && x !== 8 && x !== 16 && x !== 24 && x !== 32 && x !== 40 && x < 48 && 
    chssBrd[x+15].dist === null) ? (chssBrd[x+15].pred = chssBrd[x], chssBrd[x+15].dist = 
    chssBrd[x].dist + 1, moves.push(chssBrd[x+15].location)) : null; // down2-left1

  (x > 1 && x < 8 && chssBrd[x+6].dist === null || x > 9 && x < 16 && chssBrd[x+6].dist 
    === null || x > 17 && x < 24 && chssBrd[x+6].dist === null || x > 25 && x < 32 && 
    chssBrd[x+6].dist === null || x > 33 && x < 40 && chssBrd[x+6].dist === null || 
    x > 41 && x < 48 && chssBrd[x+6].dist === null || x > 49 && x <56 && chssBrd[x+6].dist 
    === null) ? (chssBrd[x+6].pred = chssBrd[x], chssBrd[x+6].dist = chssBrd[x].dist + 1, 
    moves.push(chssBrd[x+6].location)) : null; // left2-down1

  (x > 9 && x < 16 && chssBrd[x-10].dist === null || x > 17 && x < 24 && 
    chssBrd[x-10].dist === null || x > 25 && x < 32 && chssBrd[x-10].dist === null ||
    x > 33 && x < 40 && chssBrd[x-10].dist === null || x > 41 && x < 48 && 
    chssBrd[x-10].dist === null || x > 49 && x < 56 && chssBrd[x-10].dist === null || 
    x > 57 && x <= 63 && chssBrd[x-10].dist === null) ? (chssBrd[x-10].pred = chssBrd[x], 
    chssBrd[x-10].dist = chssBrd[x].dist + 1, moves.push(chssBrd[x-10].location)) : null; // left2-up1
};


// TESTING
createChessBoard(); 
knightMoves([7,0],[5,7]);