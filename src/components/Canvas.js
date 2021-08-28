import { useCallback, useRef, useState, useEffect } from "react";
import * as GOL from "../helpers/gameOfLife.js";

const Canvas = ({
  positionX,
  setPositionX,
  positionY,
  setPositionY,
  cellSize,
  setCellSize,
  liveCells,
  setLiveCells,
  neighbourCounts,
  setNeighbourCounts,
}) => {
  const canvasRef = useRef();

  const [isMoving, setIsMoving] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState("");

  const renderBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const offscreen = new OffscreenCanvas(canvas.width, canvas.height);
    const octx = offscreen.getContext("2d");

    let totalSize = Math.max(Math.floor(cellSize * 1.1), cellSize + 1);

    let startX = -((positionX % totalSize) + (positionX < 0 ? totalSize : 0));
    let startY = -((positionY % totalSize) + (positionY < 0 ? totalSize : 0));

    for (let i = startX; i < offscreen.width; i += totalSize) {
      for (let j = startY; j < offscreen.height; j += totalSize) {
        const x = (positionX + i) / totalSize;
        const y = (positionY + j) / totalSize;
        octx.fillStyle = liveCells.has(GOL.coord(x, y)) ? "black" : "lightblue";
        octx.fillRect(i, j, cellSize, cellSize);
      }
    }

    const btm = offscreen.transferToImageBitmap();
    const ctx = canvas.getContext("bitmaprenderer");
    ctx.transferFromImageBitmap(btm);
  }, [cellSize, liveCells, positionX, positionY]);

  const startMoving = (e) => {
    if (isDrawing) return;
    setIsMoving(true);
  };

  const stopMoving = () => {
    setIsMoving(false);
  };

  const move = (e) => {
    if (!isMoving) return;
    setPositionX(positionX - e.movementX);
    setPositionY(positionY - e.movementY);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    canvas.style.backgroundColor = "grey";
  }, []);

  // useAnimationFrame(renderBoard);
  const frameRef = useRef();
  cancelAnimationFrame(frameRef.current);
  frameRef.current = requestAnimationFrame(renderBoard);

  const drawCell = (e) => {
    if (!isDrawing) return;

    let x = e.clientX;
    let y = e.clientY;

    let totalSize = Math.max(Math.floor(cellSize * 1.1), cellSize + 1);

    let cellX = Math.floor((positionX + x) / totalSize);
    let cellY = Math.floor((positionY + y) / totalSize);
    let cellCoord = GOL.coord(cellX, cellY);

    const newLiveCells = new Set(liveCells);
    const newNeighbourCounts = new Map(neighbourCounts);

    if (drawMode === "add") {
      GOL.addLiveCell(newLiveCells, newNeighbourCounts, cellCoord);
    } else if (drawMode === "delete") {
      GOL.deleteLiveCell(newLiveCells, newNeighbourCounts, cellCoord);
    } else {
      if (liveCells.has(cellCoord)) {
        GOL.deleteLiveCell(newLiveCells, newNeighbourCounts, cellCoord);
        setDrawMode("delete");
      } else {
        GOL.addLiveCell(newLiveCells, newNeighbourCounts, cellCoord);
        setDrawMode("add");
      }
    }

    setLiveCells(newLiveCells);
    setNeighbourCounts(newNeighbourCounts);
  };

  const shiftHandler = (e) => {
    if (e.shiftKey && !isDrawing) startDrawing();
    else if (!e.shiftKey) stopDrawing();
  };

  const startDrawing = () => {
    setIsDrawing(true);
    document.getElementById("gameboardCanvas").setAttribute("drawing", ""); // ---- issue 1 solution
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    document.getElementById("gameboardCanvas").removeAttribute("drawing"); // ---- issue 1 solution
  };

  const mouseButtonHandler = (e) => {
    // if left mouse button is down
    if (e.buttons === 1) {
      if (isDrawing) drawCell(e);
      else if (!isMoving) startMoving();
    } else {
      if (isMoving) stopMoving();
      if (isDrawing) setDrawMode("");
    }
  };

  const mouseMoveHandler = (e) => {
    if (isDrawing && e.buttons === 1) drawCell(e);
    else move(e);
  };

  const wheelHandler = (e) => {
    if (e.deltaY > 0) setCellSize(Math.max(8, cellSize - 4));
    else setCellSize(Math.min(80, cellSize + 4));
  };

  return (
    <canvas
      id="gameboardCanvas"
      ref={canvasRef}
      onMouseDown={mouseButtonHandler}
      onMouseUp={mouseButtonHandler}
      onMouseEnter={(e) => {
        mouseButtonHandler(e);
        document.getElementById("gameboardCanvas").focus();
      }}
      onMouseOut={mouseButtonHandler}
      onMouseMove={mouseMoveHandler}
      onKeyDown={shiftHandler}
      onKeyUp={shiftHandler}
      onWheel={wheelHandler}
      // drawing={isDrawing}   ---- issue 1: code not working for some unkown reason
      tabIndex={0}
    ></canvas>
  );
};

export default Canvas;
