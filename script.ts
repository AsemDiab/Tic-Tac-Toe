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
class Tic_Tac_Toe {
  private gameState: GameStatus = "playing";
  private board: string[][];
  private currentPlayer: string;
  private turns: number = 0;
  private players: Player[];
  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2];
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.currentPlayer = "X";
    this.resetGame();
    this.updateTitle();
    this.init_actions();
    this.initalizeResetButton();
  }

  init_actions() {
    const cells = document.querySelectorAll(".cell");
    let i = 0;
    cells.forEach((cell) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      cell.addEventListener("click", () => {
        if (this.gameState !== "playing") return;
        if (this.board[row][col] !== "") return;

        this.turns++;
        this.board[row][col] = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase() + "_cell");
        const move: Move = { row, col, player: this.currentPlayer };

        if (this.isthereawinner(move)) {
          this.gameState = this.currentPlayer === "X" ? "X wins" : "O wins";
          switch (this.gameState) {
            case "X wins":
              this.players[0].socre++;
              break;
            case "O wins":
              this.players[1].socre++;
              break;
          }
          this.updateScore();
        } else {
          this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        }

        if (this.turns === 9 && this.gameState === "playing") {
          this.gameState = "draw";
        }
        this.updateTitle();
      });
      i++;
    });
  }
  initalizeResetButton() {
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        this.resetGame();
      });
    }
  }

  isthereawinner(lastMove: Move): boolean {
    // Check rows
    const cells: HTMLDivElement[] = [];
    if (this.board[lastMove.row].every((cell) => cell === lastMove.player)) {
      this.board[lastMove.row].forEach((_, colIndex) => {
        const cell = document.getElementById(
          `cell-${lastMove.row * 3 + colIndex}`,
        ) as HTMLDivElement | null;
        if (cell) {
          cell.classList.add("winning_cell");
          cells.push(cell);
        }
      });

      drawLine(cells);

      return true;
    }
    // Check columns
    if (this.board.every((row) => row[lastMove.col] === lastMove.player)) {
      for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        const cell = document.getElementById(
          `cell-${rowIndex * 3 + lastMove.col}`,
        ) as HTMLDivElement | null;
        if (cell) {
          cell.classList.add("winning_cell");
          cells.push(cell);
        }
      }
      drawLine(cells);

      return true;
    }
    // Check diagonals
    if (
      lastMove.row === lastMove.col &&
      this.board[0][0] === lastMove.player &&
      this.board[1][1] === lastMove.player &&
      this.board[2][2] === lastMove.player
    ) {
      this.board.forEach((_, index) => {
        const cell = document.getElementById(
          `cell-${index * 3 + index}`,
        ) as HTMLDivElement | null;
        if (cell) {
          cell.classList.add("winning_cell");
          cells.push(cell);
        }
      });
      drawLine(cells);

      return true;
    }
    if (
      lastMove.row + lastMove.col === 2 &&
      this.board[0][2] === lastMove.player &&
      this.board[1][1] === lastMove.player &&
      this.board[2][0] === lastMove.player
    ) {
      this.board.forEach((_, index) => {
        const cell = document.getElementById(
          `cell-${index * 3 + (2 - index)}`,
        ) as HTMLDivElement | null;
        if (cell) {
          cell.classList.add("winning_cell");
          cells.push(cell);
        }
      });
      drawLine(cells);

      return true;
    }
    return false;
  }

  resetGame() {
    this.turns = 0;
    const strok = document.querySelector(
      "#storke-line",
    ) as HTMLDivElement | null;
    if (strok) {
      strok.style.display = "none";
    }

    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.currentPlayer = "X";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x_cell", "o_cell", "winning_cell");
    });

    this.gameState = "playing";
    this.updateTitle();
  }

  updateTitle() {
    const title = document.getElementById("padTitle");
    if (title) {
      switch (this.gameState) {
        case "X wins":
          title.textContent = "X wins!";
          break;
        case "O wins":
          title.textContent = "O wins!";
          break;
        case "draw":
          title.textContent = "It's a draw!";
          break;
        default:
          title.textContent = "Tic Tac Toe";
      }

      if (this.gameState !== "playing") {
        const blocker = document.getElementById("blocker");
        if (blocker) {
          blocker.style.display = "flex";
        }
      } else {
        const blocker = document.getElementById("blocker");
        if (blocker) {
          blocker.style.display = "none";
        }
      }
    }
  }

  updateScore() {
    const score1Element = document.getElementById("score1");
    const score2Element = document.getElementById("score2");
    if (score1Element) {
      score1Element.textContent = `${this.players[0].socre}`;
    }
    if (score2Element) {
      score2Element.textContent = `${this.players[1].socre}`;
    }
  }
}

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");
const game = new Tic_Tac_Toe(player1, player2);
