import Board from "./Board.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

export default function startGame() {
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
}