import Cell from "./Cell.js";

export default class Board {
    constructor(numOfRows, numOfCols, percentOfMines, startX, startY, width) {
        this.numOfRows = numOfRows;
        this.numOfCols = numOfCols;
        this.percentOfMines = percentOfMines;
        this.startX = startX;
        this.startY = startY;
        this.width = width;     // width of 1 cell
        this.grid = this.createGrid();
    }

    createGrid() {
        let grid = new Array(this.numOfRows);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(this.numOfCols);
        }

        return grid;
    }

    init() {
        // Create the cells and determine if each is a mine or not
        for (let i = 0; i < this.numOfRows; i++) {
            for (let j = 0; j < this.numOfCols; j++) {
                let value = (Math.random() < this.percentOfMines) ? "x" : "";
                this.grid[i][j] =
                    new Cell(this.startX + j * this.width, this.startY + i * this.width, this.width, value);
            }
        }

        // Place the values in each cell
        for (let i = 0; i < this.numOfRows; i++) {
            for (let j = 0; j < this.numOfCols; j++) {
                if (this.grid[i][j].isMine()) {
                    continue;
                }

                // If the cell is not a mine, assign a number to it based on the no. of surrounding mines
                let number = this.getNumberOfSurroundingMines(i, j);
                this.grid[i][j].setValue(number);
            }
        }
    }

    render() {
        for (let i = 0; i < this.numOfRows; i++) {
            for (let j = 0; j < this.numOfCols; j++) {
                this.grid[i][j].drawRevealedCell();
            }
        }
    }

    getNumberOfSurroundingMines(rowIdx, colIdx) {
        let numberOfMines = 0;
        for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
            for (let j = colIdx - 1; j <= colIdx + 1; j++) {
                if (i < 0 || i >= this.numOfRows || j < 0 || j >= this.numOfCols) {
                    continue;
                }
                if (i == rowIdx && j == colIdx) {
                    continue;
                }
                if (this.grid[i][j].isMine()) {
                    numberOfMines++;
                }
            }
        }

        return numberOfMines;
    }

}