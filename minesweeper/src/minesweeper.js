const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let rows = 0; rows < numberOfRows; rows++){
      let row = [];
      for(let columns = 0; columns < numberOfColumns; columns++){
          row.push(' ');
      }
        board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for(let rows = 0; rows < numberOfRows; rows++){
      let row = [];
      for(let columns = 0; columns < numberOfColumns; columns++){
          row.push(null);
      }
        board.push(row);
  }
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
   }
  }
  return board;
}

const getNumberOfNeighbourBombs = (bombBoard, flipRow, flipColumn) => {
  const neighbourOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighbourOffsets.forEach(offset => {
    const neighbourRowIndex = (flipRow + offset[0]);
    const neighbourColumnIndex = (flipColumn + offset[1]);
    if ((neighbourRowIndex >= 0) && (neighbourRowIndex < numberOfRows) && (neighbourColumnIndex >= 0) && (neighbourColumnIndex < numberOfColumns)){
      if (bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
          numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, flipRow, flipColumn) => {
  if (playerBoard[flipRow][flipColumn] !== ' ') {
    // console.log('This tile has already been flipped!')
    return;
  } else if (bombBoard[flipRow][flipColumn] === 'B') {
    playerBoard[flipRow][flipColumn] = 'B';
  } else {
    playerBoard[flipRow][flipColumn] = getNumberOfNeighbourBombs(bombBoard, flipRow, flipColumn);
  }
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

const playerBoard = generatePlayerBoard(3,3)
const bombBoard = generateBombBoard(3,3,3)

console.log('Player board: ');
printBoard(playerBoard);
console.log('Bomb board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 1)
console.log('Updated Player Board: ');
printBoard(playerBoard);

console.log(getNumberOfNeighbourBombs(bombBoard, 0, 0));
