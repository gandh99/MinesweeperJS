import CellState from "./CellState.js";

let textColourMap = new Map();
textColourMap.set(1, "#0602e5");
textColourMap.set(2, "#279227");
textColourMap.set(3, "#fe0814");
textColourMap.set(4, "#17135d");
textColourMap.set(5, "#7e090f");
textColourMap.set(6, "#008284");
textColourMap.set(7, "#0a0d0c");
textColourMap.set(8, "#808080");

let cellColourMap = new Map();
cellColourMap.set(CellState.UNREVEALED, "#c2bfc0");
cellColourMap.set(CellState.REVEALED_SAFE, "white");
cellColourMap.set(CellState.REVEALED_MINE, "red");

export const getTextColour = (value) => {
    return textColourMap.get(value);
}

export const getCellColour = (cellState) => {
    return cellColourMap.get(cellState);
}