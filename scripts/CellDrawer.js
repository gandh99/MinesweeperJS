export default class CellDrawer {
    constructor() {

    }

    drawBlankCell(x, y, width) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.rect(x, y, width, width);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    drawText(x, y, value) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.font = 'bold 30px serif';
        ctx.fillText(value, x + 17, y + 35);
    }

    drawRevealedCell(x, y, width, value) {
        this.drawBlankCell(x, y, width);
        this.drawText(x, y, value);
    }
}