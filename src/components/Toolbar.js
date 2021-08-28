const Toolbar = ({
  togglePlaying,
  isPlaying,
  cellSize,
  setCellSize,
  playSpeed,
  setPlaySpeed,
  generation,
  randomizeBoard,
  clearBoard,
}) => {
  return (
    <div className="Toolbar">
      {/* <button onClick={randomizeCells}>Randomize</button> */}
      <div className="playAligner">
        <button className="playButton" onClick={togglePlaying}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div id="generation">Generation: {generation}</div>
      </div>
      <div className="slidersAligner">
        <div class="slidecontainer" id="cellSizeSliderContainer">
          Cell Size: {cellSize}
          <form>
            <input
              type="range"
              min="8"
              max="80"
              value={cellSize}
              class="slider"
              id="cellSizeSlider"
              onChange={(e) => {
                setCellSize(parseInt(e.target.value));
              }}
            />
          </form>
        </div>
        <div class="slidecontainer" id="playSpeedSliderContainer">
          Speed: {playSpeed}
          <form>
            <input
              type="range"
              min="1"
              max="100"
              value={playSpeed}
              class="slider"
              id="playSpeedSlider"
              onChange={(e) => {
                setPlaySpeed(parseInt(e.target.value));
              }}
            />
          </form>
        </div>
      </div>
      <div className="buttonsAligner">
        <button className="randomizeButton" onClick={randomizeBoard}>
          Randomize
        </button>
        <button className="clearButton" onClick={clearBoard}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
