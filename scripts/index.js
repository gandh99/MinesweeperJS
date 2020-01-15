import Board from "./Board.js";

// Resize canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Global variables
let width = 50;
let startX = 400;
let startY = 10;
let numOfRows = 10;
let numOfCols = 10;
let percentageOfMines = 0.2;

let board = new Board(numOfRows, numOfCols, percentageOfMines, startX, startY, width);
board.init();
board.render();

// Listen for clicks
canvas.addEventListener('click', function (event) {
    let elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop,
        x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    board.select(x, y);
}, false);
