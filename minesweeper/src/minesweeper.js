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

// console.log(generatePlayerBoard(2, 2));

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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    // this could still place bombs on top of other bombs
  }
  return board;
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

const playerBoard = generatePlayerBoard(3,4)
const bombBoard = generateBombBoard(3,4,5)

console.log('Player board: ');
printBoard(playerBoard);
console.log('Bomb board: ');
printBoard(bombBoard);
