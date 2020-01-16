import {getTextColour, getCellColour} from "./colourMap.js";
import CellState from "./CellState.js";

export default class CellDrawer {
    constructor() {

    }

    drawCell(x, y, width, currentCellState, value) {
        // Draw the cell
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = getCellColour(currentCellState);
        ctx.rect(x, y, width, width);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Draw the content (if applicable)
        if (currentCellState == CellState.UNREVEALED) {
            return;
        } else if (currentCellState == CellState.REVEALED_SAFE) {
            this.drawText(x, y, value);
        } else if (currentCellState == CellState.REVEALED_MINE) {
            this.drawMine(x, y, width);
        }

    }

    drawText(x, y, value) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = getTextColour(value);
        ctx.font = 'bold 30px serif';
        ctx.fillText(value, x + 17, y + 35);
    }

    drawMine(x, y, width) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        // Create an image object. This is not attached to the DOM and is not part of the page.
        let url = "../images/mine.png";
        let image = new Image();

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