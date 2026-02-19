type Move = {
  row: number;
  col: number;
  player: string;
};
type GameStatus = "playing" | "X wins" | "O wins" | "draw";
class Tic_Tac_Toe {
  private gameState: GameStatus = "playing";
  private board: string[][];
  private currentPlayer: string;
  private turns: number = 0;
  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.currentPlayer = "X";
    this.init_actions();
  }
  init_actions() {
    const cells = document.querySelectorAll(".cell");
    let i = 0;
    cells.forEach((cell) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      cell.addEventListener("click", () => {
        this.turns++;
        console.log(`Clicked cell: ${row}, ${col}`);
        if (this.board[row][col] === "") {
          this.board[row][col] = this.currentPlayer;
          //   cell.textContent = this.currentPlayer;
          cell.classList.add(this.currentPlayer.toLowerCase() + "_cell");
          const move: Move = { row, col, player: this.currentPlayer };
          if (this.isthereawinner(move)) {
            alert(`${this.currentPlayer} wins!`);
            this.resetGame();
          } else {
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
          }
        }
        if (this.turns === 9) {
          alert("It's a draw!");
          this.resetGame();
        }
      });
      i++;
    });
  }
  isthereawinner(lastMove: Move): boolean {
    // Check rows
    if (this.board[lastMove.row].every((cell) => cell === lastMove.player)) {
      return true;
    }
    // Check columns
    if (this.board.every((row) => row[lastMove.col] === lastMove.player)) {
      return true;
    }
    // Check diagonals
    if (
      lastMove.row === lastMove.col &&
      this.board[0][0] === lastMove.player &&
      this.board[1][1] === lastMove.player &&
      this.board[2][2] === lastMove.player
    ) {
      return true;
    }
    if (
      lastMove.row + lastMove.col === 2 &&
      this.board[0][2] === lastMove.player &&
      this.board[1][1] === lastMove.player &&
      this.board[2][0] === lastMove.player
    ) {
      return true;
    }
    return false;
  }

  resetGame() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.currentPlayer = "X";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x_cell", "o_cell");
    });
  }
}

const game = new Tic_Tac_Toe();
