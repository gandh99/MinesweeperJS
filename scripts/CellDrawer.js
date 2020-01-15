import getValueColour from "./cellColour.js";
import CellState from "./CellState.js";

export default class CellDrawer {
    constructor() {

    }

    drawBlankCell(x, y, width, currentCellState) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = (currentCellState == CellState.REVEALED) ? "white" : "#c2bfc0";
        ctx.rect(x, y, width, width);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    drawRevealedCell(x, y, width, value) {
        this.drawBlankCell(x, y, width, CellState.REVEALED);

        if (value == "x") {
            this.drawMine("../images/mine.png", x, y, width)
        } else {
            this.drawText(x, y, value);
        }
    }

    drawText(x, y, value) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = getValueColour(value);
        ctx.font = 'bold 30px serif';
        ctx.fillText(value, x + 17, y + 35);
    }

    drawMine(url, x, y, width) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        // Create an image object. This is not attached to the DOM and is not part of the page.
        var image = new Image();

        // When the image has loaded, draw it to the canvas
        image.onload = function () {
            let imageScale = 0.6;
            let imageSize = imageScale * width;
            let imageMargin = (width - imageSize) / 2;
            ctx.drawImage(image, x + imageMargin, y + imageMargin, imageSize, imageSize);
        }

        // Now set the source of the image that we want to load
        image.src = url;
    }
}