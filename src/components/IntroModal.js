const IntroModal = () => {
  return (
    <div id="introModal" class="modal" style={{ display: "block" }}>
      <div class="modal-content">
        <div class="modal-header">
          <span
            class="close"
            onClick={() => {
              document.getElementById("introModal").style.display = "none";
            }}
          >
            &times;
          </span>
          <h2>Welcome</h2>
        </div>
        <div class="modal-body">
          <p>
            This is an interactive version of John Conway's Game of Life made
            by&nbsp;
            <a
              href="https://www.linkedin.com/in/spencerkeene/"
              target={"_blank"}
              rel="noreferrer"
            >
              Spencer Keene
            </a>
            .
          </p>
          <p>
            To learn how the game works checkout my{" "}
            <a
              href="https://github.com/SpencerKeene/React-Conways-Game-of-Life/blob/main/README.md"
              target={"_blank"}
              rel="noreferrer"
            >
              README
            </a>
            .
          </p>
          <p>
            To learn about the Game of Life, visit the Game of Life&nbsp;
            <a
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
              target={"_blank"}
              rel="noreferrer"
            >
              Wikipedia page
            </a>
            .
          </p>
          <p>Try to make some interesting patterns and enjoy!</p>
          <h3>Instrctions</h3>
          <p>To move around the board, simply click and drag.</p>
          <p>
            To draw on the board and either bring a cell to life or kill it,
            hold SHIFT while clicking on a cell. You can hold down on the mouse
            while moving it around to continue adding or removing cells
            (depending on what cell you clicked on first).
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
