var Tic_Tac_Toe = /** @class */ (function () {
    function Tic_Tac_Toe() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.currentPlayer = "X";
        this.init_actions();
    }
    Tic_Tac_Toe.prototype.init_actions = function () {
        var _this = this;
        var cells = document.querySelectorAll(".cell");
        var i = 0;
        cells.forEach(function (cell) {
            var row = Math.floor(i / 3);
            var col = i % 3;
            cell.addEventListener("click", function () {
                console.log("Clicked cell: ".concat(row, ", ").concat(col));
                if (_this.board[row][col] === "") {
                    _this.board[row][col] = _this.currentPlayer;
                    //   cell.textContent = this.currentPlayer;
                    cell.classList.add(_this.currentPlayer.toLowerCase() + "_cell");
                    var move = { row: row, col: col, player: _this.currentPlayer };
                    if (_this.isthereawinner(move)) {
                        alert("".concat(_this.currentPlayer, " wins!"));
                        _this.resetGame();
                    }
                    else {
                        _this.currentPlayer = _this.currentPlayer === "X" ? "O" : "X";
                    }
                }
            });
            i++;
        });
    };
    Tic_Tac_Toe.prototype.isthereawinner = function (lastMove) {
        // Check rows
        if (this.board[lastMove.row].every(function (cell) { return cell === lastMove.player; })) {
            return true;
        }
        // Check columns
        if (this.board.every(function (row) { return row[lastMove.col] === lastMove.player; })) {
            return true;
        }
        // Check diagonals
        if (lastMove.row === lastMove.col &&
            this.board[0][0] === lastMove.player &&
            this.board[1][1] === lastMove.player &&
            this.board[2][2] === lastMove.player) {
            return true;
        }
        if (lastMove.row + lastMove.col === 2 &&
            this.board[0][2] === lastMove.player &&
            this.board[1][1] === lastMove.player &&
            this.board[2][0] === lastMove.player) {
            return true;
        }
        return false;
    };
    Tic_Tac_Toe.prototype.resetGame = function () {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.currentPlayer = "X";
        var cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            cell.textContent = "";
            cell.classList.remove("x_cell", "o_cell");
        });
    };
    return Tic_Tac_Toe;
}());
var game = new Tic_Tac_Toe();
