class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
  }
  playMove (rowIndex, columnIndex) {
   this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over! Final board: ');
      this._board.print();
    } else if (!this._board.hasSafeTiles) {
      console.log('You\'ve won! Final Board: ');
      this._board.print();
    } else  {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
  this._numberOfBombs = numberOfBombs;
  this._numberOfTiles = (numberOfRows * numberOfColumns)
  this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns)
  this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  }
  get playerBoard() {
    return this._playerBoard;
  }
      flipTile(rowIndex, columnIndex){
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        // console.log('This tile has already been flipped!')
        return;
      } if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
      }
      this._numberofTiles --;
    }
    getNumberOfNeighbourBombs(rowIndex, columnIndex){
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
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighbourOffsets.forEach(offset => {
        const neighbourRowIndex = (rowIndex + offset[0]);
        const neighbourColumnIndex = (columnIndex + offset[1]);
        if ((neighbourRowIndex >= 0) && (neighbourRowIndex < numberOfRows) && (neighbourColumnIndex >= 0) && (neighbourColumnIndex < numberOfColumns)){
          if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
              numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  hasSafeTiles () {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
      const board = [];
      for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
          const row = [];
          for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
              row.push(' ');
          }
            board.push(row);
      }
      return board;
    }
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
        const row = [];
        for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            row.push(null);
        }
          board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
     }
    }
    return board;
  }
}
