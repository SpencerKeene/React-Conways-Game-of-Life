import { useCallback, useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import * as GOL from "../helpers/GameOfLife.js";

const Gameboard = () => {
  const [generation, setGeneration] = useState(0);
  const [liveCells, setLiveCells] = useState(new Set());
  const [neighbourCounts, setNeighbourCounts] = useState(new Map());
  // add initial layout

  const [cellSize, setCellSize] = useState(30);
  const [playSpeed, setPlaySpeed] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimeoutRef = useRef();

  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const advanceGame = useCallback(() => {
    // console.log("advancing");
    const [newCells, newCounts] = GOL.advance(liveCells, neighbourCounts);
    setLiveCells(newCells);
    setNeighbourCounts(newCounts);
    setGeneration((prevGen) => prevGen + 1);
  }, [liveCells, neighbourCounts]);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const playHandler = () => {
    clearTimeout(playTimeoutRef.current);
    if (isPlaying) {
      playTimeoutRef.current = setTimeout(advanceGame, 1000 - playSpeed * 10);
    }
  };

  const clearBoard = () => {
    setIsPlaying(false);
    clearTimeout(playTimeoutRef.current);

    setPositionX(0);
    setPositionY(0);

    setLiveCells(new Set());
    setNeighbourCounts(new Map());
    setGeneration(0);
  };

  const randomizeBoard = () => {
    clearBoard();

    let maxWidth = window.innerWidth / cellSize;
    let maxHeight = window.innerHeight / cellSize;

    const start = [Math.floor(maxWidth * 0.05), Math.floor(maxHeight * 0.1)];
    const end = [Math.floor(maxWidth * 0.83), Math.floor(maxHeight * 0.72)];
    const [newCells, newCounts] = GOL.randomize(...start, ...end);
    setLiveCells(newCells);
    setNeighbourCounts(newCounts);
  };

  useEffect(() => {
    clearBoard();
  }, []);

  useEffect(playHandler, [advanceGame, isPlaying, playSpeed]);

  return (
    <div className="Gameboard">
      <Canvas
        positionX={positionX}
        setPositionX={setPositionX}
        positionY={positionY}
        setPositionY={setPositionY}
        cellSize={cellSize}
        setCellSize={setCellSize}
        liveCells={liveCells}
        setLiveCells={setLiveCells}
        neighbourCounts={neighbourCounts}
        setNeighbourCounts={setNeighbourCounts}
      />
      <Toolbar
        isPlaying={isPlaying}
        togglePlaying={togglePlaying}
        cellSize={cellSize}
        setCellSize={setCellSize}
        playSpeed={playSpeed}
        setPlaySpeed={setPlaySpeed}
        generation={generation}
        randomizeBoard={randomizeBoard}
        clearBoard={clearBoard}
      />
    </div>
  );
};

export default Gameboard;
