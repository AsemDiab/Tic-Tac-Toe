type Move = {
  row: number;
  col: number;
  player: string;
};
type GameStatus = "playing" | "X wins" | "O wins" | "draw";
class Player {
  name: string;
  symbol: string;
  socre: number = 0;
  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
  }
}

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");
class LogicManager {
  public board: string[][];
  public winningCells: [number, number][] = [];
  public gameState: GameStatus = "playing";
  public currentPlayer: string = "X";
  private turns: number = 0;
  private static instance: LogicManager | null = null;
  private constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  static createNewGame(): LogicManager {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LogicManager();
    return this.instance;
  }

  reset() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.gameState = "playing";
    this.winningCells = [];
    this.currentPlayer = "X";
    this.turns = 0;
  }
  checkWinner(lastMove: Move): boolean {
    // Check rows
    if (this.board[lastMove.row].every((cell) => cell === lastMove.player)) {
      for (let colIndex = 0; colIndex < 3; colIndex++)
        this.winningCells.push([lastMove.row, colIndex]);
      return true;
    }

    if (this.board.every((row) => row[lastMove.col] === lastMove.player)) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        this.winningCells.push([rowIndex, lastMove.col]);
      }

      return true;
    }

    if (
      lastMove.row === lastMove.col &&
      this.board[0][0] === lastMove.player &&
      this.board[1][1] === lastMove.player &&
      this.board[2][2] === lastMove.player
    ) {
      this.board.forEach((_, index) => {
        this.winningCells.push([index, index]);
      });
      return true;
    }

    if (
      lastMove.row + lastMove.col === 2 &&
      this.board[0][2] === lastMove.player &&
      this.board[1][1] === lastMove.player &&
      this.board[2][0] === lastMove.player
    ) {
      this.board.forEach((_, index) => {
        this.winningCells.push([index, 2 - index]);
      });

      return true;
    }

    return false;
  }

  incrementTurn() {
    this.turns++;
    if (this.turns === 9 && this.gameState === "playing") {
      this.gameState = "draw";
    }
  }

  getturns() {
    return this.turns;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }
}
class UIManager {
  cells: HTMLDivElement[][] = [[], [], []];
  TitleElement: HTMLDivElement | null = null;
  ScoreElements: [HTMLDivElement | null, HTMLDivElement | null] = [null, null];
  BlockerElement: HTMLDivElement | null = null;
  StorkeElement: HTMLDivElement | null = null;
  static instance: UIManager | null = null;
  private constructor() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.getElementById(
          `cell-${row * 3 + col}`,
        ) as HTMLDivElement | null;
        this.cells[row][col] = cell ? cell : document.createElement("div");
      }
    }

    this.TitleElement = document.getElementById(
      "padTitle",
    ) as HTMLDivElement | null;
    this.ScoreElements[0] = document.getElementById(
      "score1",
    ) as HTMLDivElement | null;
    this.ScoreElements[1] = document.getElementById(
      "score2",
    ) as HTMLDivElement | null;
    this.BlockerElement = document.getElementById(
      "blocker",
    ) as HTMLDivElement | null;
    this.StorkeElement = document.getElementById(
      "storke-line",
    ) as HTMLDivElement | null;
  }

  static getInstance(): UIManager {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UIManager();
    return this.instance;
  }

  inlizializeEvent() {
    let i = 0;
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        const rowindex = Math.floor(i / 3);
        const col = i % 3;

        ++i;
        console.log(`Initializing cell: Row ${rowindex}, Col ${col}`);

        cell.addEventListener("click", () => {
          const logicManager = LogicManager.createNewGame();
          // Handle cell click

          console.log(`Cell clicked: Row ${rowindex}, Col ${col}`);
          console.log(logicManager.board);
          if (logicManager.gameState !== "playing") return;
          if (logicManager.board[rowindex][col] !== "") return;
          logicManager.board[rowindex][col] = logicManager.currentPlayer;
          logicManager.incrementTurn();
          this.markdownCell(
            rowindex,
            col,
            logicManager.currentPlayer.toLowerCase(),
          );
          const move: Move = {
            row: rowindex,
            col,
            player: logicManager.currentPlayer,
          };
          if (logicManager.checkWinner(move)) {
            logicManager.gameState =
              logicManager.currentPlayer === "X" ? "X wins" : "O wins";
            switch (logicManager.gameState) {
              case "X wins":
                player1.socre++;
                break;
              case "O wins":
                player2.socre++;
                break;
            }
            this.updateScore(player1.socre, player2.socre);
            this.APPLYWINNINGSTROKE();
          } else {
            logicManager.currentPlayer =
              logicManager.currentPlayer === "X" ? "O" : "X";
          }

          if (
            logicManager.getturns() === 9 &&
            logicManager.gameState === "playing"
          ) {
            logicManager.gameState = "draw";
          }
          this.updateTitle(logicManager.gameState);
        });
      });
    });
  }

  initalizeResetButton() {
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        const logicManager = LogicManager.createNewGame();
        logicManager.reset();
        this.reset();
      });
    }
  }
  updateScore(player1Score: number, player2Score: number) {
    if (this.ScoreElements[0]) {
      this.ScoreElements[0].textContent = `${player1Score}`;
    }
    if (this.ScoreElements[1]) {
      this.ScoreElements[1].textContent = `${player2Score}`;
    }
  }

  APPLYWINNINGSTROKE() {
    drawLine(
      LogicManager.createNewGame().winningCells.map(([row, col]) => {
        const cell = this.cells[row][col];
        if (cell) {
          cell.classList.add("winning_cell");
        }
        return cell;
      }) as HTMLDivElement[],
    );

    this.BlockerElement?.style.setProperty("display", "flex");
    this.StorkeElement?.style.setProperty("display", "block");
  }
  updateTitle(gameState: GameStatus) {
    if (this.TitleElement) {
      switch (gameState) {
        case "X wins":
          this.TitleElement.textContent = "X wins!";
          break;
        case "O wins":
          this.TitleElement.textContent = "O wins!";
          break;
        case "draw":
          this.TitleElement.textContent = "It's a draw!";
          break;
        default:
          this.TitleElement.textContent = "Tic Tac Toe";
      }
    }
  }

  markdownCell(row: number, col: number, symbol: string) {
    const cell = this.cells[row][col];
    if (cell) {
      cell.classList.add(symbol.toLowerCase() + "_cell");
    }
  }

  reset() {
    this.cells.forEach((row) =>
      row.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("x_cell", "o_cell", "winning_cell");
      }),
    );
    if (this.BlockerElement) {
      this.BlockerElement.style.display = "none";
    }
    if (this.StorkeElement) {
      this.StorkeElement.style.display = "none";
    }

    if (this.TitleElement) {
      this.TitleElement.textContent = "Tic Tac Toe";
    }

    if (this.StorkeElement) {
      this.StorkeElement.style.display = "none";
    }
  }
}
class Game {
  constructor() {
    const logicManager = LogicManager.createNewGame();
    const uiManager = UIManager.getInstance();
    uiManager.inlizializeEvent();
    uiManager.initalizeResetButton();
  }
}

const game = new Game();
