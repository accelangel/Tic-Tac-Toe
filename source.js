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

    populateBoard();
    eventCreator();

    return { createBoard, gameboard, populateBoard, playerFactory, players };

})();

const gameHandler = function (target) {
    // take target.tile and assign it to a variable, like chosenTile
    let chosenTile = target.tile;
    console.log(chosenTile);
    // now you need something to find out whose turn it is
    let playerOne = module.players.playerOne;
    let playerTwo = module.players.playerTwo;
    if (playerOne.myTurn === true) {
        // okay here a few things need to happen
        // first playerOneTurn should be set to false, and the opposite for playerTwoTurn
        // next the selected tile needs to be added into the myTile array for that player
        // then some kind of update display function needs to be invoked
        // lets commit here though, thats far enough
        playerOne.myTurn = false;
        playerTwo.myTurn = true;
        playerOne.myTiles.push(chosenTile);
        console.log('player one move');
        console.log(target);
    }
    else {
        playerTwo.myTurn = false;
        playerOne.myTurn = true;
        playerTwo.myTiles.push(chosenTile);
        console.log('player two move');
        console.log(target);
    }
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
