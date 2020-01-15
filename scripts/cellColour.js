let colourMap = new Map();
colourMap.set(1, "#0602e5");
colourMap.set(2, "#279227");
colourMap.set(3, "#fe0814");
colourMap.set(4, "#17135d");
colourMap.set(5, "#7e090f");
colourMap.set(6, "#008284");
colourMap.set(7, "#0a0d0c");
colourMap.set(8, "#808080");

export default function getValueColour(value) {
    return colourMap.get(value);
}