import Cell from "./Cell.js";

export default class Board {
    constructor(numOfRows, numOfCols, percentOfMines, startX, startY, width) {
        this.numOfRows = numOfRows;
        this.numOfCols = numOfCols;
        this.percentOfMines = percentOfMines;
        this.actualNumberOfMines = 0;
        this.numberOfRevealedSafeCells = 0;
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
                let value = (Math.random() < this.percentOfMines) ? -1 : 0; // -1 represents a mine; 0 is temporary
                this.grid[i][j] =
                    new Cell(this.startX + j * this.width, this.startY + i * this.width, this.width, value);
            }
        }

        // Place the values in each cell
        for (let i = 0; i < this.numOfRows; i++) {
            for (let j = 0; j < this.numOfCols; j++) {
                if (this.grid[i][j].isMine()) {
                    this.actualNumberOfMines++;
                    continue;
                }

                // If the cell is not a mine, assign a number to it based on the no. of surrounding mines
                let number = this.getNumberOfSurroundingMines(i, j);
                this.grid[i][j].cellValue = number;
            }
        }
    }

    render() {
        for (let i = 0; i < this.numOfRows; i++) {
            for (let j = 0; j < this.numOfCols; j++) {
                this.grid[i][j].drawCell();
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

    select(x, y) {
        // Ignore if x and y are out of bounds
        if (this.outOfBounds(x, y)) {
            return;
        }

        // Get the cell that was selected
        let selectedRow = Math.floor((y - this.startY) / this.width);
        let selectedCol = Math.floor((x - this.startX) / this.width);

        // If the cell is flagged, do not allow it to be selected
        if (this.grid[selectedRow][selectedCol].cellFlagged()) {
            return;
        }

        // If the cell is a mine, reveal all cells
        if (this.grid[selectedRow][selectedCol].isMine()) {
            this.revealAllCells();
            return;
        }

        // Reveal the surrounding cells if this cell has no surrounding mines
        if (this.grid[selectedRow][selectedCol].cellValue == 0) {
            this.revealSurroundingCells(selectedRow, selectedCol);
            return;
        }

        // Reveal this cell
        this.numberOfRevealedSafeCells++;
        this.grid[selectedRow][selectedCol].markRevealed();
        this.grid[selectedRow][selectedCol].drawCell();

        // Check for win condition
        if (this.hasWon()) {
            alert("Congratulations! You have won!");
        }
    }

    flag(x, y) {
        // Ignore if x and y are out of bounds
        if (this.outOfBounds(x, y)) {
            return;
        }

        // Get the cell that was selected
        let selectedRow = Math.floor((y - this.startY) / this.width);
        let selectedCol = Math.floor((x - this.startX) / this.width);

        // Check if the cell is valid to be flagged
        if (this.grid[selectedRow][selectedCol].cellRevealed()) {
            return;
        }

        this.grid[selectedRow][selectedCol].toggleFlagged();
        this.grid[selectedRow][selectedCol].drawCell();
    }

    revealSurroundingCells(rowIdx, colIdx) {
        for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
            for (let j = colIdx - 1; j <= colIdx + 1; j++) {
                if (i < 0 || i >= this.numOfRows || j < 0 || j >= this.numOfCols || this.grid[i][j].cellRevealed()) {
                    continue;
                }

                this.numberOfRevealedSafeCells++;
                this.grid[i][j].markRevealed();
                this.grid[i][j].drawCell();

                if (this.grid[i][j].cellValue == 0) {
                    this.revealSurroundingCells(i, j);
                }
            }
        }
    }

    revealAllCells() {
        for (let i = 0; i < this.numOfRows; i++) {
            for (let j = 0; j < this.numOfCols; j++) {
                this.grid[i][j].markRevealed();
                this.grid[i][j].drawCell();
            }
        }
    }

    outOfBounds(x, y) {
        return (x < this.startX
            || x > this.startX + this.width * this.numOfCols
            || y < this.startY
            || y > this.startY + this.width * this.numOfRows);
    }

    hasWon() {
        return this.numberOfRevealedSafeCells == this.numOfRows * this.numOfCols - this.actualNumberOfMines;
    }
}