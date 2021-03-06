import Board from "./Board.js";
import BoardSize from "./BoardSize.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let board;

export default function startGame(boardSize) {
    let width = BoardSize.properties[boardSize].width;
    let startX = BoardSize.properties[boardSize].startX;
    let startY = BoardSize.properties[boardSize].startY;
    let numOfRows = BoardSize.properties[boardSize].numOfRows;
    let numOfCols = BoardSize.properties[boardSize].numOfCols;
    let percentageOfMines = 0.2;

    board = new Board(numOfRows, numOfCols, percentageOfMines, startX, startY, width);
    board.init();
    board.render();

    // Listen for clicks in the board
    // Important to remove event listener in case the user clicks on a new size button
    // If we don't do it, the event listener will still remain even after the canvas is redrawn
    canvas.removeEventListener('click', detectBoardLeftClick);
    canvas.removeEventListener('click', detectBoardShiftClick);
    canvas.addEventListener('click', detectBoardLeftClick, false);
    canvas.addEventListener('click', detectBoardShiftClick, false);
}

// Normal left click for selecting a cell
function detectBoardLeftClick(event) {
    if (event.shiftKey) {
        return;
    }

    let elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop,
        x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    board.select(x, y);
};

// Shift-click for flagging a cell
function detectBoardShiftClick(event) {
    if (event.shiftKey) {
        let elemLeft = canvas.offsetLeft,
            elemTop = canvas.offsetTop,
            x = event.pageX - elemLeft,
            y = event.pageY - elemTop;
        board.flag(x, y);
    }
}