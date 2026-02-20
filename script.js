var Player = /** @class */ (function () {
    function Player(name, symbol) {
        this.socre = 0;
        this.name = name;
        this.symbol = symbol;
    }
    return Player;
}());
var Tic_Tac_Toe = /** @class */ (function () {
    function Tic_Tac_Toe(player1, player2) {
        this.gameState = "playing";
        this.turns = 0;
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
    Tic_Tac_Toe.prototype.init_actions = function () {
        var _this = this;
        var cells = document.querySelectorAll(".cell");
        var i = 0;
        cells.forEach(function (cell) {
            var row = Math.floor(i / 3);
            var col = i % 3;
            cell.addEventListener("click", function () {
                if (_this.gameState !== "playing")
                    return;
                if (_this.board[row][col] !== "")
                    return;
                _this.turns++;
                _this.board[row][col] = _this.currentPlayer;
                cell.classList.add(_this.currentPlayer.toLowerCase() + "_cell");
                var move = { row: row, col: col, player: _this.currentPlayer };
                if (_this.isthereawinner(move)) {
                    _this.gameState = _this.currentPlayer === "X" ? "X wins" : "O wins";
                    switch (_this.gameState) {
                        case "X wins":
                            _this.players[0].socre++;
                            break;
                        case "O wins":
                            _this.players[1].socre++;
                            break;
                    }
                    _this.updateScore();
                }
                else {
                    _this.currentPlayer = _this.currentPlayer === "X" ? "O" : "X";
                }
                if (_this.turns === 9 && _this.gameState === "playing") {
                    _this.gameState = "draw";
                }
                _this.updateTitle();
            });
            i++;
        });
    };
    Tic_Tac_Toe.prototype.initalizeResetButton = function () {
        var _this = this;
        var resetButton = document.getElementById("resetButton");
        if (resetButton) {
            resetButton.addEventListener("click", function () {
                _this.resetGame();
            });
        }
    };
    Tic_Tac_Toe.prototype.isthereawinner = function (lastMove) {
        // Check rows
        var cells = [];
        if (this.board[lastMove.row].every(function (cell) { return cell === lastMove.player; })) {
            this.board[lastMove.row].forEach(function (_, colIndex) {
                var cell = document.getElementById("cell-".concat(lastMove.row * 3 + colIndex));
                if (cell) {
                    cell.classList.add("winning_cell");
                    cells.push(cell);
                }
            });
            drawLine(cells);
            return true;
        }
        // Check columns
        if (this.board.every(function (row) { return row[lastMove.col] === lastMove.player; })) {
            for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
                var cell = document.getElementById("cell-".concat(rowIndex * 3 + lastMove.col));
                if (cell) {
                    cell.classList.add("winning_cell");
                    cells.push(cell);
                }
            }
            drawLine(cells);
            return true;
        }
        // Check diagonals
        if (lastMove.row === lastMove.col &&
            this.board[0][0] === lastMove.player &&
            this.board[1][1] === lastMove.player &&
            this.board[2][2] === lastMove.player) {
            this.board.forEach(function (_, index) {
                var cell = document.getElementById("cell-".concat(index * 3 + index));
                if (cell) {
                    cell.classList.add("winning_cell");
                    cells.push(cell);
                }
            });
            drawLine(cells);
            return true;
        }
        if (lastMove.row + lastMove.col === 2 &&
            this.board[0][2] === lastMove.player &&
            this.board[1][1] === lastMove.player &&
            this.board[2][0] === lastMove.player) {
            this.board.forEach(function (_, index) {
                var cell = document.getElementById("cell-".concat(index * 3 + (2 - index)));
                if (cell) {
                    cell.classList.add("winning_cell");
                    cells.push(cell);
                }
            });
            drawLine(cells);
            return true;
        }
        return false;
    };
    Tic_Tac_Toe.prototype.resetGame = function () {
        this.turns = 0;
        var strok = document.querySelector("#storke-line");
        if (strok) {
            strok.style.display = "none";
        }
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.currentPlayer = "X";
        var cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            cell.textContent = "";
            cell.classList.remove("x_cell", "o_cell", "winning_cell");
        });
        this.gameState = "playing";
        this.updateTitle();
    };
    Tic_Tac_Toe.prototype.updateTitle = function () {
        var title = document.getElementById("padTitle");
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
                var blocker = document.getElementById("blocker");
                if (blocker) {
                    blocker.style.display = "flex";
                }
            }
            else {
                var blocker = document.getElementById("blocker");
                if (blocker) {
                    blocker.style.display = "none";
                }
            }
        }
    };
    Tic_Tac_Toe.prototype.updateScore = function () {
        var score1Element = document.getElementById("score1");
        var score2Element = document.getElementById("score2");
        if (score1Element) {
            score1Element.textContent = "".concat(this.players[0].socre);
        }
        if (score2Element) {
            score2Element.textContent = "".concat(this.players[1].socre);
        }
    };
    return Tic_Tac_Toe;
}());
var player1 = new Player("Player 1", "X");
var player2 = new Player("Player 2", "O");
var game = new Tic_Tac_Toe(player1, player2);
