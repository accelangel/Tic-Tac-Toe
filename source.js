/*
- rule of thumb: if you need ONE of something, use a module, if you need multiples, create them with factories
- sounds like modules for functions and factories for objects?
- the gameboard is supposed to be stored as an array within a Gameboard object
- the players are also supposed to be stored in objects
----------lets see if we can make a console version first, then switch to DOM after----------
*/

//start with a module (IIFE), that will populate the board with tiles
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
            let temp = obj;
            target.addEventListener('click', function () {
                gameHandler(temp);
            });
        };
    };

    const playerFactory = function () {
        const playerOne = { myTurn: true, myTiles: [] };
        const playerTwo = { myTurn: false, myTiles: [] };
        return { playerOne, playerTwo }
    }

    let players = playerFactory();

    const refreshDOM = function (tile, player) {
        let domTarget = document.querySelector(`.${tile}`);
        if (player === 'playerOne') {
            domTarget.classList.add('markX');
        }
        else {
            domTarget.classList.add('markO');
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

    function rowCondition(board) {
        for (row of board) {
            if (row.every((mark) => mark === 'X') || row.every((mark) => mark === 'O')) {
                console.log('row win')
                return true;
            }
            else {
                return false
            }
        };
    };

    function colCondition(board) {
        let c1 = [], c2 = [], c3 = [];
        for (row of board) {
            c1.push(row[0]);
            c2.push(row[1]);
            c3.push(row[2]);
        }
        let columns = [c1, c2, c3];
        for (col of columns) {
            if (col.every((mark) => mark === 'X') || col.every((mark) => mark === 'O')) {
                console.log('column win');
                return true;
            }
            else {
                return false;
            };
        };
    };

    const victoryCheck = function (target) {
        let cell = target.tile.slice(-1);
        let marker = target.value;
        cellDrop(cell, marker);
        rowCondition(board);
        colCondition(board);
        //console.log(`Row Win: ${rowWin} | Column Win: ${colWin}`);
    }


    populateBoard();
    eventCreator();

    return { createBoard, gameboard, populateBoard, playerFactory, players, refreshDOM, victoryCheck };

})();

const gameHandler = function (target) {
    let chosenTile = target.tile;
    let playerOne = game.players.playerOne;
    let playerTwo = game.players.playerTwo;
    if (target.taken === false) {
        if (playerOne.myTurn === true) {
            playerOne.myTurn = false;
            playerTwo.myTurn = true;
            playerOne.myTiles.push(chosenTile);
            target.value = 'X';
            game.refreshDOM(chosenTile, 'playerOne');
        }
        else {
            playerTwo.myTurn = false;
            playerOne.myTurn = true;
            playerTwo.myTiles.push(chosenTile);
            target.value = 'O';
            game.refreshDOM(chosenTile, 'playerTwo');
        };
    };
    //check for a winner here
    game.victoryCheck(target);
}
/*
obviously you should have a factory function to create two players, playerOne and playerTwo
later down the line if you have a computer to play against, that computer can just take over playTwo's object
-now that i think about it, player can be one object called players, that stores two player objects....aw snap


you will need a gameHandler to control whose "turn" it is
based on whose turn it is and which tile they clicked, the tile should turn a certain color
any click on the gameHandler should switch whose turn it is
and the player object should be given a value according to the tile they clicked

the display needs to be updated with the new values on the tile object as well

then eventually at the end of the gameHandler, a check for winner function can be run, but we will get to that later

















*/
