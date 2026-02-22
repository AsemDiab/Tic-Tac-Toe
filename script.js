var Player = /** @class */ (function () {
    function Player(name, symbol) {
        this.socre = 0;
        this.name = name;
        this.symbol = symbol;
    }
    return Player;
}());
var player1 = new Player("Player 1", "X");
var player2 = new Player("Player 2", "O");
var LogicManager = /** @class */ (function () {
    function LogicManager() {
        this.winningCells = [];
        this.gameState = "playing";
        this.currentPlayer = "X";
        this.turns = 0;
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    LogicManager.createNewGame = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new LogicManager();
        return this.instance;
    };
    LogicManager.prototype.reset = function () {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.gameState = "playing";
        this.winningCells = [];
        this.currentPlayer = "X";
        this.turns = 0;
    };
    LogicManager.prototype.checkWinner = function (lastMove) {
        var _this = this;
        // Check rows
        if (this.board[lastMove.row].every(function (cell) { return cell === lastMove.player; })) {
            for (var colIndex = 0; colIndex < 3; colIndex++)
                this.winningCells.push([lastMove.row, colIndex]);
            return true;
        }
        if (this.board.every(function (row) { return row[lastMove.col] === lastMove.player; })) {
            for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
                this.winningCells.push([rowIndex, lastMove.col]);
            }
            return true;
        }
        if (lastMove.row === lastMove.col &&
            this.board[0][0] === lastMove.player &&
            this.board[1][1] === lastMove.player &&
            this.board[2][2] === lastMove.player) {
            this.board.forEach(function (_, index) {
                _this.winningCells.push([index, index]);
            });
            return true;
        }
        if (lastMove.row + lastMove.col === 2 &&
            this.board[0][2] === lastMove.player &&
            this.board[1][1] === lastMove.player &&
            this.board[2][0] === lastMove.player) {
            this.board.forEach(function (_, index) {
                _this.winningCells.push([index, 2 - index]);
            });
            return true;
        }
        return false;
    };
    LogicManager.prototype.incrementTurn = function () {
        this.turns++;
        if (this.turns === 9 && this.gameState === "playing") {
            this.gameState = "draw";
        }
    };
    LogicManager.prototype.getturns = function () {
        return this.turns;
    };
    LogicManager.prototype.getCurrentPlayer = function () {
        return this.currentPlayer;
    };
    LogicManager.instance = null;
    return LogicManager;
}());
var UIManager = /** @class */ (function () {
    function UIManager() {
        this.cells = [[], [], []];
        this.TitleElement = null;
        this.ScoreElements = [null, null];
        this.BlockerElement = null;
        this.StorkeElement = null;
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                var cell = document.getElementById("cell-".concat(row * 3 + col));
                this.cells[row][col] = cell ? cell : document.createElement("div");
            }
        }
        this.TitleElement = document.getElementById("padTitle");
        this.ScoreElements[0] = document.getElementById("score1");
        this.ScoreElements[1] = document.getElementById("score2");
        this.BlockerElement = document.getElementById("blocker");
        this.StorkeElement = document.getElementById("storke-line");
    }
    UIManager.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new UIManager();
        return this.instance;
    };
    UIManager.prototype.inlizializeEvent = function () {
        var _this = this;
        var i = 0;
        this.cells.forEach(function (row) {
            row.forEach(function (cell) {
                var rowindex = Math.floor(i / 3);
                var col = i % 3;
                ++i;
                console.log("Initializing cell: Row ".concat(rowindex, ", Col ").concat(col));
                cell.addEventListener("click", function () {
                    var logicManager = LogicManager.createNewGame();
                    // Handle cell click
                    console.log("Cell clicked: Row ".concat(rowindex, ", Col ").concat(col));
                    console.log(logicManager.board);
                    if (logicManager.gameState !== "playing")
                        return;
                    if (logicManager.board[rowindex][col] !== "")
                        return;
                    logicManager.board[rowindex][col] = logicManager.currentPlayer;
                    logicManager.incrementTurn();
                    _this.markdownCell(rowindex, col, logicManager.currentPlayer.toLowerCase());
                    var move = {
                        row: rowindex,
                        col: col,
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
                        _this.updateScore(player1.socre, player2.socre);
                        _this.APPLYWINNINGSTROKE();
                    }
                    else {
                        logicManager.currentPlayer =
                            logicManager.currentPlayer === "X" ? "O" : "X";
                    }
                    if (logicManager.getturns() === 9 &&
                        logicManager.gameState === "playing") {
                        logicManager.gameState = "draw";
                    }
                    _this.updateTitle(logicManager.gameState);
                });
            });
        });
    };
    UIManager.prototype.initalizeResetButton = function () {
        var _this = this;
        var resetButton = document.getElementById("resetButton");
        if (resetButton) {
            resetButton.addEventListener("click", function () {
                var logicManager = LogicManager.createNewGame();
                logicManager.reset();
                _this.reset();
            });
        }
    };
    UIManager.prototype.updateScore = function (player1Score, player2Score) {
        if (this.ScoreElements[0]) {
            this.ScoreElements[0].textContent = "".concat(player1Score);
        }
        if (this.ScoreElements[1]) {
            this.ScoreElements[1].textContent = "".concat(player2Score);
        }
    };
    UIManager.prototype.APPLYWINNINGSTROKE = function () {
        var _this = this;
        var _a, _b;
        drawLine(LogicManager.createNewGame().winningCells.map(function (_a) {
            var row = _a[0], col = _a[1];
            var cell = _this.cells[row][col];
            if (cell) {
                cell.classList.add("winning_cell");
            }
            return cell;
        }));
        (_a = this.BlockerElement) === null || _a === void 0 ? void 0 : _a.style.setProperty("display", "flex");
        (_b = this.StorkeElement) === null || _b === void 0 ? void 0 : _b.style.setProperty("display", "block");
    };
    UIManager.prototype.updateTitle = function (gameState) {
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
    };
    UIManager.prototype.markdownCell = function (row, col, symbol) {
        var cell = this.cells[row][col];
        if (cell) {
            cell.classList.add(symbol.toLowerCase() + "_cell");
        }
    };
    UIManager.prototype.reset = function () {
        this.cells.forEach(function (row) {
            return row.forEach(function (cell) {
                cell.textContent = "";
                cell.classList.remove("x_cell", "o_cell", "winning_cell");
            });
        });
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
    };
    UIManager.instance = null;
    return UIManager;
}());
var Game = /** @class */ (function () {
    function Game() {
        var logicManager = LogicManager.createNewGame();
        var uiManager = UIManager.getInstance();
        uiManager.inlizializeEvent();
        uiManager.initalizeResetButton();
    }
    return Game;
}());
var game = new Game();
