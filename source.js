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
        for (t = 0; t < 9; t++) {
            let tile = {};
            tile.tile = `tile${t}`;
            tile.value = null;
            board.push(tile);
        };
        return { board };
    };

    let gameboard = createBoard();

    return {
        createBoard, gameboard
    };

})();






































