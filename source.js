/*
- rule of thumb: if you need ONE of something, use a module, if you need multiples, create them with factories
- sounds like modules for functions and factories for objects?
- the gameboard is supposed to be stored as an array within a Gameboard object
- the players are also supposed to be stored in objects
----------lets see if we can make a console version first, then switch to DOM after----------
*/

//start with a module (IIFE), that will populate the board with tiles
const module = (function () {
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

    populateBoard()

    return {
        createBoard, gameboard, populateBoard
    };

})();






































