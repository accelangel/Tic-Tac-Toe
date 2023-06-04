const resetGame = function () {
    resetButton.classList.toggle('displayToggle');
    game.gameboard = game.createBoard();
    for (obj of game.gameboard.board) {
        let target = document.querySelector(`.${obj.tile}`);
        target.classList.remove('markX');
        target.classList.remove('markO');
    }
    game.players = game.playerFactory();
    game.gameOver = false;
    game.resetStatus();
    for (i = 1; i < 10; i++) {
        let target = document.querySelector(`.tile${i}`);
        target.textContent = '';
    };
    game.takenTiles = [];
};

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', resetGame);

const game = (function () {
    const createBoard = function () {
        const board = [];
        for (t = 1; t < 10; t++) {
            let tile = {};
            tile.tile = `tile${t}`;
            tile.value = null;
            tile.taken = false;
            board.push(tile);
        };
        return { board };
    };

    let gameboard = createBoard();

    const populateBoard = function () {
        const board = document.querySelector('.board');
        for (obj of gameboard.board) {
            let tileElement = document.createElement('div');
            tileElement.classList.add('gameTile');
            tileElement.classList.add(obj.tile);
            board.append(tileElement);
        };
    };

    const eventCreator = function () {
        for (obj of gameboard.board) {
            let target = document.querySelector(`.${obj.tile}`);
            let instance = obj;
            target.addEventListener('click', function () {
                gameHandler(instance);
            });
        };
    };

    const playerFactory = function () {
        const playerOne = { myTurn: true, myTiles: [] };
        const playerTwo = { myTurn: false, myTiles: [] };
        return { playerOne, playerTwo }
    }

    let players = playerFactory();

    const refreshTiles = function (tile, player) {
        let domTarget = document.querySelector(`.${tile}`);
        if (player === 'playerOne') {
            domTarget.classList.add('markX');
            domTarget.textContent = 'X';
        }
        else {
            domTarget.classList.add('markO');
            domTarget.textContent = 'O';
        }
    }

    let board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];

    function cellDrop(cell, marker) {
        let row = Math.floor((cell - 1) / 3);
        let col = (cell - 1) % 3;
        board[row][col] = marker;
    }

    function colCondition(board) {
        let c1 = [], c2 = [], c3 = [];
        for (row of board) {
            c1.push(row[0]);
            c2.push(row[1]);
            c3.push(row[2]);
        }
        let columns = [c1, c2, c3];
        return columns;
    };

    function diagCondition(board) {
        let d1 = [], d2 = [];
        let t = 2;
        for (i = 0; i < 3; i++) {
            d1.push(board[i][i]);
            d2.push(board[i][t])
            t--;
        }
        let diagonals = [d1, d2];
        return diagonals;
    }

    function winConditions(array) {
        let result = false;
        for (arr of array) {
            if (arr.every((mark) => mark === 'X') || arr.every((mark) => mark === 'O')) {
                result = true;
                board = [
                    ['-', '-', '-'],
                    ['-', '-', '-'],
                    ['-', '-', '-']
                ];
            }
        };
        return result;
    }

    const victoryCheck = function (target) {
        let cell = target.tile.slice(-1);
        let marker = target.value;
        cellDrop(cell, marker);
        let rowWin = winConditions(board);
        let colWin = winConditions(colCondition(board));
        let diagWin = winConditions(diagCondition(board));
        if (rowWin === true || colWin == true || diagWin === true) {
            return true;
        }
        else {
            return false;
        }
    };

    let gameStatus = document.querySelector('.gameStatus');
    let playerStatus = document.querySelector('.playerStatus');
    const infoContainer = document.querySelector('.infoContainer');

    const turnUpdate = function (player) {
        playerStatus.textContent = player;
    };

    const victory = function (winner) {
        if (winner === 'Tie') {
            gameStatus.classList.add('winner');
            gameStatus.textContent = `Tie Game!`;
        }
        else {
            gameStatus.classList.add('winner');
            gameStatus.textContent = `${winner} wins!`;
        }
    }

    const resetStatus = function () {
        infoContainer.innerHTML = '<p class="gameStatus"><Span class="playerStatus">Player 1</Span>, make your move</p>';
        gameStatus = document.querySelector('.gameStatus');
        playerStatus = document.querySelector('.playerStatus');
    }

    let gameOver = false;

    let takenTiles = [];

    populateBoard();
    eventCreator();

    return {
        createBoard,
        gameboard,
        populateBoard,
        playerFactory,
        players,
        refreshTiles,
        victoryCheck,
        turnUpdate,
        victory,
        gameOver,
        playerStatus,
        gameStatus,
        resetStatus,
        takenTiles
    };
})();

const gameHandler = function (target) {
    if (!game.takenTiles.includes(target.tile)) {
        game.takenTiles.push(target.tile);
        if (game.gameOver === false) {
            let chosenTile = target.tile;
            let playerOne = game.players.playerOne;
            let playerTwo = game.players.playerTwo;
            if (target.taken === false) {
                if (playerOne.myTurn === true) {
                    playerOne.myTurn = false;
                    playerTwo.myTurn = true;
                    playerOne.myTiles.push(chosenTile);
                    target.value = 'X';
                    game.refreshTiles(chosenTile, 'playerOne');
                    game.turnUpdate('Player 2');
                }
                else {
                    playerTwo.myTurn = false;
                    playerOne.myTurn = true;
                    playerTwo.myTiles.push(chosenTile);
                    target.value = 'O';
                    game.refreshTiles(chosenTile, 'playerTwo');
                    game.turnUpdate('Player 1');
                };
            };
            let victory = game.victoryCheck(target);
            if (victory === true) {

                if (target.value === 'X') {
                    console.log('yellow wins!')
                    game.victory('Player 1');
                }
                else {
                    console.log('red wins!')
                    game.victory('Player 2');
                }
                game.gameOver = true;
                resetButton.classList.toggle('displayToggle');
            }
            else {
                if (game.takenTiles.length === 9) {
                    game.victory('Tie');
                    resetButton.classList.toggle('displayToggle');
                }
            }
        }
    }
}
