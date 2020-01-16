let BoardSize = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
    properties: {
        1: { name: "Small", width:  50, startX: 400, startY: 10, numOfRows: 10, numOfCols: 10 },
        2: { name: "Medium", width: 30, startX: 400, startY: 10, numOfRows: 15, numOfCols: 15 },
        3: { name: "Large", width: 25, startX: 400, startY: 10, numOfRows: 20, numOfCols: 20 }
    }
};

export default BoardSize;