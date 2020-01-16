import startGame from "./gameManager.js";
import BoardSize from "./BoardSize.js";

// Resize canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Draw size buttons
let startX = 10, startY = 100;
let sizeButtonVerticalMargin = 100;
let buttonWidth = 200, buttonHeight = 70;

drawMenuBar();

function drawMenuBar() {
    drawSizeButton(startX, startY, buttonWidth, buttonHeight, BoardSize.SMALL);
    drawSizeButton(startX, startY + sizeButtonVerticalMargin, buttonWidth, buttonHeight, BoardSize.MEDIUM);
    drawSizeButton(startX, startY + 2 * sizeButtonVerticalMargin, buttonWidth, buttonHeight, BoardSize.LARGE);
}

function drawSizeButton(startX, startY, width, height, boardSize) {
    // Draw the button
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(startX, startY, width, height);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = 'bold 30px serif';
    ctx.fillText(BoardSize.properties[boardSize].name, startX + 10, startY + 40);

    // Add click functionality
    canvas.addEventListener('click', function (event) {
        let elemLeft = canvas.offsetLeft,
            elemTop = canvas.offsetTop,
            x = event.pageX - elemLeft,
            y = event.pageY - elemTop;
        if (x > startX && x < startX + width && y > startY && y < startY + height) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMenuBar();
            startGame(boardSize);
        }
    }, false);
}