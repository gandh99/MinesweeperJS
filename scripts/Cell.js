import CellDrawer from "./CellDrawer.js";
import CellState from "./CellState.js";

export default class Cell {
    constructor(x, y, width, value) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.value = value;
        this.cellState = CellState.UNREVEALED;
        this.cellDrawer = new CellDrawer();
    }

    get cellValue() {
        return this.value;
    }

    set cellValue(value) {
        this.value = value;
    }

    drawBlankCell(cellState) {
        this.cellDrawer.drawBlankCell(this.x, this.y, this.width, cellState);
    }

    drawRevealedCell() {
        this.cellState = CellState.REVEALED;
        this.cellDrawer.drawRevealedCell(this.x, this.y, this.width, this.value);
    }

    isMine() {
        return this.value == -1;
    }

    setValue(value) {
        this.value = value;
    }

    markRevealed() {
        this.cellState = CellState.REVEALED;
    }

    isRevealed() {
        return this.cellState == CellState.REVEALED;
    }
}
