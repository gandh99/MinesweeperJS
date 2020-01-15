import CellDrawer from "./CellDrawer.js";

export default class Cell {
    constructor(x, y, width, value) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.value = value;
        this.cellDrawer = new CellDrawer();
    }

    drawBlankCell() {
        this.cellDrawer.drawBlankCell(this.x, this.y, this.width);
    }

    drawRevealedCell() {
        this.cellDrawer.drawRevealedCell(this.x, this.y, this.width, this.value);
    }

    isMine() {
        return this.value == "x";
    }

    setValue(value) {
        this.value = value;
    }
}