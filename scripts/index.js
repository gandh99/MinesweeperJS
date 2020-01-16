import startGame from "./gameManager.js";

// Resize canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Draw size buttons
let startX = 10;
let startY = 100;
let sizeButtonVerticalMargin = 100;

drawSizeButton(startX, startY, 200, 70, "Small");
drawSizeButton(startX, startY + sizeButtonVerticalMargin, 200, 70, "Medium");
drawSizeButton(startX, startY + 2 * sizeButtonVerticalMargin, 200, 70, "Large");

function drawSizeButton(startX, startY, width, height, text) {
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
    ctx.fillText(text, startX + 10, startY + 40);

    // Add click functionality
    canvas.addEventListener('click', function (event) {
        let elemLeft = canvas.offsetLeft,
            elemTop = canvas.offsetTop,
            x = event.pageX - elemLeft,
            y = event.pageY - elemTop;
        if (x > startX && x < startX + width && y > startY && y < startY + height) {
            alert(text);
        }
    }, false);
}

startGame();
