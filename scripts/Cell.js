import CellDrawer from "./CellDrawer.js";
import CellState from "./CellState.js";

export default class Cell {
    constructor(x, y, width, value) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.value = value;
        this.isRevealed = false;
        this.cellState = CellState.UNREVEALED;
        this.cellDrawer = new CellDrawer();
    }

    get cellValue() {
        return this.value;
    }

    set cellValue(value) {
        this.value = value;
    }

    drawCell() {
        this.cellDrawer.drawCell(this.x, this.y, this.width, this.cellState, this.value);
    }

    isMine() {
        return this.value == -1;
    }

    markRevealed() {
        this.isRevealed = true;
        this.cellState = (this.value == -1) ? CellState.REVEALED_MINE : CellState.REVEALED_SAFE;
    }

    cellRevealed() {
        return this.isRevealed;
    }
}
