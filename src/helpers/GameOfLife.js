export const advance = (liveCells, neighbourCounts) => {
  const newLiveCells = new Set();
  const newNeighbourCounts = new Map();

  liveCells.forEach((cell) => {
    if (neighbourCounts.get(cell) === 2 || neighbourCounts.get(cell) === 3) {
      addLiveCell(newLiveCells, newNeighbourCounts, cell);
    }
  });
  neighbourCounts.forEach((neighbours, cell) => {
    if (!liveCells.has(cell) && neighbours === 3) {
      addLiveCell(newLiveCells, newNeighbourCounts, cell);
    }
  });

  return [newLiveCells, newNeighbourCounts];
};

export const randomize = (startX, startY, endX, endY) => {
  const liveCells = new Set();
  const neighbourCounts = new Map();

  for (let i = startX; i < endX; i++) {
    for (let j = startY; j < endY; j++) {
      if (Math.random() < 1 / 3) {
        addLiveCell(liveCells, neighbourCounts, coord(i, j));
      }
    }
  }

  return [liveCells, neighbourCounts];
};

export const coord = (x, y) => {
  return x + "," + y;
};

export const parseCoord = (cellCoord) => {
  return cellCoord.match(/-?\d+/g).map((v) => parseInt(v));
};

export const addLiveCell = (liveCells, neighbourCounts, cellCoord) => {
  if (liveCells.has(cellCoord)) return;

  liveCells.add(cellCoord);
  incrementNeighbours(neighbourCounts, cellCoord);
};

export const deleteLiveCell = (liveCells, neighbourCounts, cellCoord) => {
  if (!liveCells.has(cellCoord)) return;

  liveCells.delete(cellCoord);
  decrementNeighbours(neighbourCounts, cellCoord);
};

const incrementNeighbours = (neighbourCounts, cellCoord) => {
  const [x, y] = parseCoord(cellCoord);

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const cellCoord = coord(x + i, y + j);
      const prevCount = neighbourCounts.get(cellCoord);
      neighbourCounts.set(cellCoord, (prevCount | 0) + 1);
    }
  }
};

const decrementNeighbours = (neighbourCounts, cellCoord) => {
  const [x, y] = parseCoord(cellCoord);

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const cellCoord = coord(x + i, y + j);
      const prevCount = neighbourCounts.get(cellCoord);

      if (prevCount) {
        if (prevCount === 1) neighbourCounts.delete(cellCoord);
        neighbourCounts.set(cellCoord, prevCount - 1);
      }
    }
  }
};
