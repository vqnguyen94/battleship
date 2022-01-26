/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGame": () => (/* binding */ newGame)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
//could make button section just display the end of game message,
//now just styling stuff
//npx webpack --watch





var Game = function () {
  var setupGame = function setupGame() {
    var player = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])("Viet");
    var cpu = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])("Computer");
    var playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var cpuGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var userInterface = (0,_dom__WEBPACK_IMPORTED_MODULE_2__["default"])(player, cpu, playerGameboard, cpuGameboard);
    var gameContainer = document.getElementById("container");
    gameContainer.appendChild(userInterface.makeTitle());
    gameContainer.appendChild(userInterface.setupGame());
  };

  setupGame();
  return {
    setupGame: setupGame
  };
}();

function newGame() {
  var gameContainer = document.getElementById("container");

  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  Game.setupGame();
}



/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// npm test -- gameboard.test.js
//Object where keys are coordinates and values are the ship


var Gameboard = function Gameboard() {
  var gameboard = {};
  var activeShips = [];

  var placeShip = function placeShip(shipLength, position, orientation) {
    //Coordinates is array of [x,y] based on initial position and orientation
    var coordinates = determineShipCoordinates(shipLength, position, orientation); //Make a new ship and intialize it with coordinates

    var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])();
    ship.initializeShip(coordinates);
    activeShips.push(shipLength); //Gameboard contains all ship coordinates and each coordinate corresponds to its respective ship

    for (var i = 0; i < coordinates.length; i++) {
      var key = String(coordinates[i]);
      gameboard[key] = ship;
    }
  };

  var receiveAttack = function receiveAttack(position) {
    var key = String(position); //If coordinate exists in the gameboard, a ship is hit

    if (key in gameboard) {
      var ship = gameboard[key];
      ship.hit(key); //If attack sinks the ship, remove that ship (corresponding to shiplength) from active ships

      if (ship.isSunk()) {
        activeShips.splice(activeShips.indexOf(ship.shipLength), 1);
      }

      return [key, true];
    } //Attack was a miss


    return [key, false];
  };

  var determineShipCoordinates = function determineShipCoordinates(shipLength, startPosition, orientation) {
    var coordinates = [];
    var x, y;

    var _startPosition = _slicedToArray(startPosition, 2);

    x = _startPosition[0];
    y = _startPosition[1];

    //Vertical
    if (orientation === "Vertical") {
      var endPosition = x + shipLength;

      while (x < endPosition) {
        coordinates.push([x, y]);
        x++;
      }
    } //Horizontal
    else {
      var _endPosition = y + shipLength;

      while (y < _endPosition) {
        coordinates.push([x, y]);
        y++;
      }
    }

    return coordinates;
  };

  var determineShipOverlap = function determineShipOverlap(coordinates) {
    for (var i = 0; i < coordinates.length; i++) {
      var key = String(coordinates[i]);

      if (key in gameboard) {
        return true;
      }
    }

    return false;
  };

  var determineOutOfBounds = function determineOutOfBounds(coordinates) {
    var x, y;

    for (var i = 0; i < coordinates.length; i++) {
      var _coordinates$i = _slicedToArray(coordinates[i], 2);

      x = _coordinates$i[0];
      y = _coordinates$i[1];

      if (x > 9 || y > 9) {
        return false;
      }
    }

    return true;
  };

  var determineAllShipsSunk = function determineAllShipsSunk() {
    return activeShips.length;
  };

  var getGameboard = function getGameboard() {
    return gameboard;
  };

  return {
    determineShipCoordinates: determineShipCoordinates,
    determineOutOfBounds: determineOutOfBounds,
    determineShipOverlap: determineShipOverlap,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    determineAllShipsSunk: determineAllShipsSunk,
    getGameboard: getGameboard
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Object where coordinate string is the key and true/false values signify a hit/miss
var Ship = function Ship() {
  var ship = {};
  var length; //Initialize coordinates as false/unhit

  var initializeShip = function initializeShip(coordinates) {
    for (var i = 0; i < coordinates.length; i++) {
      var key = String(coordinates[i]);
      ship[key] = false;
    }

    length = coordinates.length;
  };

  var hit = function hit(position) {
    ship[position] = true;
  }; //If there is a single coordinate that is false/unhit, then the ship is still active


  var isSunk = function isSunk() {
    for (var key in ship) {
      if (ship[key] === false) {
        return false;
      }
    }

    return true;
  };

  var shipLength = function shipLength() {
    return length;
  };

  return {
    hit: hit,
    isSunk: isSunk,
    initializeShip: initializeShip,
    shipLength: shipLength
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Player = function Player(name) {
  var attackHistory = [];

  var attack = function attack(enemyGameboard, position) {
    return enemyGameboard.receiveAttack(position);
  }; //Attack used by CPU player


  var randomAttack = function randomAttack(enemyGameboard) {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);

    while (attackHistory.includes(String([x, y]))) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } //Used to prevent computer from attacking same position more than once


    attackHistory.push(String([x, y]));
    return enemyGameboard.receiveAttack([x, y]);
  };

  var getName = function getName() {
    return name;
  };

  return {
    getName: getName,
    attack: attack,
    randomAttack: randomAttack
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var UserInterface = function UserInterface(player, cpu, playerGameboard, cpuGameboard) {
  var ships = [5, 4, 3, 3, 2];
  var cpuShips = [5, 4, 3, 3, 2];
  var orientation = "Horizontal";

  var setupGame = function setupGame() {
    var content = document.createElement("div");
    content.setAttribute("id", "content");
    content.appendChild(playerSetup());
    content.appendChild(makeButtons());
    content.appendChild(cpuSetup());
    return content;
  };

  var updateMessage = function updateMessage(name, result) {
    var statusBar = document.getElementById("".concat(name, "Status"));
    var message = result === true ? message = "Hit!" : message = "Miss!";
    statusBar.textContent = message;
    statusBar.classList.remove("next-turn");
    void statusBar.offsetWidth; //no idea what this line actually does, but it helps with restarting the animation

    statusBar.classList.add("next-turn");
  };

  var updateShipStatus = function updateShipStatus(name, activeShips) {
    var shipStatus = document.getElementById("".concat(name, "Ships"));
    shipStatus.textContent = "Active ships: ".concat(activeShips, " / 5");
  };

  var updateShipPlacementStatus = function updateShipPlacementStatus() {
    var shipStatus = document.getElementById("playerShips");
    shipStatus.textContent = "Ships placed: ".concat(5 - ships.length, " / 5");
  };

  var makeGameboard = function makeGameboard(name) {
    var gameboard = document.createElement("div");
    gameboard.setAttribute("class", "gameboard");
    gameboard.setAttribute("id", name);

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var boardSquare = document.createElement("div");
        boardSquare.setAttribute("class", "board-square");
        boardSquare.textContent = "".concat(i, ",").concat(j);
        gameboard.appendChild(boardSquare);
      }
    }

    return gameboard;
  };

  var playerSetup = function playerSetup() {
    var playerSection = document.createElement("div");
    playerSection.appendChild(makeStatusBar("player"));
    playerSection.appendChild(makePlayerGameboard());
    playerSection.appendChild(makeShipStatus("player"));
    return playerSection;
  };

  var makePlayerGameboard = function makePlayerGameboard() {
    var gameboard = makeGameboard(player.getName());

    for (var i = 0; i < gameboard.children.length; i++) {
      gameboard.children[i].addEventListener("mouseleave", resetUnusedCells);
      gameboard.children[i].addEventListener("mouseenter", validShipPositionCheck);
    }

    return gameboard;
  };

  var cpuSetup = function cpuSetup() {
    var cpuSection = document.createElement("div");
    cpuSection.appendChild(makeStatusBar("cpu"));
    cpuSection.appendChild(makeCpuGameboard());
    cpuSection.appendChild(makeShipStatus("cpu"));
    return cpuSection;
  };

  var makeCpuGameboard = function makeCpuGameboard() {
    var gameboard = makeGameboard(cpu.getName());

    for (var i = 0; i < gameboard.children.length; i++) {
      gameboard.children[i].addEventListener("click", doTurn);
    }

    gameboard.classList.toggle("disable");
    return gameboard;
  };

  var placeCpuShips = function placeCpuShips() {
    var x, y, shipLength;
    var coordinates = [];
    var randOrientation;

    while (cpuShips.length != 0) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      randOrientation = randomOrientation();
      coordinates = cpuGameboard.determineShipCoordinates(cpuShips[0], [x, y], randOrientation); //if doesnt overlap or go out of bounds for previously placed cpu ships, place and higlight the ship

      if (!cpuGameboard.determineShipOverlap(coordinates) && cpuGameboard.determineOutOfBounds(coordinates)) {
        shipLength = cpuShips.shift();
        cpuGameboard.placeShip(shipLength, [x, y], randOrientation);
      }
    }
  }; //try to use async await to make the board unclickable while the cpu is placing boards


  var doTurn = function doTurn(event) {
    document.getElementById(cpu.getName()).classList.add("disable");
    var attackPosition, attackResult, numOfActiveShips;

    var _player$attack = player.attack(cpuGameboard, event.target.textContent);

    var _player$attack2 = _slicedToArray(_player$attack, 2);

    attackPosition = _player$attack2[0];
    attackResult = _player$attack2[1];
    highlightAttack(cpu.getName(), attackPosition, attackResult);
    updateMessage("cpu", attackResult);
    numOfActiveShips = cpuGameboard.determineAllShipsSunk();
    updateShipStatus("cpu", numOfActiveShips);

    if (numOfActiveShips === 0) {
      gameOver("player");
      return;
    }

    cpuAttack();
    numOfActiveShips = playerGameboard.determineAllShipsSunk();
    updateShipStatus("player", numOfActiveShips);

    if (numOfActiveShips === 0) {
      setTimeout(gameOver, 800, "cpu");
      return;
    }

    setTimeout(enableBoard, 800);
  };

  var cpuAttack = function cpuAttack() {
    var attackPosition, attackResult;

    var _cpu$randomAttack = cpu.randomAttack(playerGameboard);

    var _cpu$randomAttack2 = _slicedToArray(_cpu$randomAttack, 2);

    attackPosition = _cpu$randomAttack2[0];
    attackResult = _cpu$randomAttack2[1];
    setTimeout(updateMessage, 800, "player", attackResult);
    setTimeout(highlightAttack, 800, player.getName(), attackPosition, attackResult);
  };

  function enableBoard() {
    document.getElementById(cpu.getName()).classList.remove("disable");
  } //for debugging


  var highlightCpuPlacedShips = function highlightCpuPlacedShips() {
    var cpuBoard = document.getElementById("Computer");
    var shipCoordinates = cpuGameboard.getGameboard();

    for (var position in shipCoordinates) {
      for (var i = 0; i < cpuBoard.children.length; i++) {
        if (cpuBoard.children[i].textContent === position) {
          cpuBoard.children[i].classList.toggle("active-ship");
          break;
        }
      }
    }
  };

  var convertStringToArray = function convertStringToArray(string) {
    var coordinate = string.split(",");
    var x = parseInt(coordinate[0]);
    var y = parseInt(coordinate[1]);
    return [x, y];
  };

  var validShipPositionCheck = function validShipPositionCheck(event) {
    var startPosition = convertStringToArray(event.target.textContent); //hypotehthical coordinates of the ship to be placed

    var coordinates = playerGameboard.determineShipCoordinates(ships[0], startPosition, orientation); //use coordinates to determine if they overlap with any ships or out of bounds

    if (!playerGameboard.determineShipOverlap(coordinates) && playerGameboard.determineOutOfBounds(coordinates)) {
      highlightValidShipPlacement(coordinates);
    } else {
      event.target.classList.add("invalid");
    }
  };

  var highlightValidShipPlacement = function highlightValidShipPlacement(coordinates) {
    var boardSquare = document.getElementById(player.getName()).children;

    for (var i = 0; i < coordinates.length; i++) {
      for (var j = 0; j < boardSquare.length; j++) {
        //highlight the squares that were checked as valid
        if (boardSquare[j].textContent === String(coordinates[i])) {
          boardSquare[j].classList.add("ship-hover");
          boardSquare[j].addEventListener("click", placeShip);
          break;
        }
      }
    }
  }; //search thru all the currently highlighted valid hover spots, add to coordinates, send coordinates to gameboard
  //if you're able to place ship its assumed that the spot is already valid


  var placeShip = function placeShip(event) {
    var shipLength = ships.shift();
    var startPosition = convertStringToArray(event.target.textContent);
    playerGameboard.placeShip(shipLength, startPosition, orientation);
    highlightPlacedShips();

    if (ships.length === 0) {
      placeCpuShips(); // highlightCpuPlacedShips();

      afterShipsPlaced();
    } else {
      updateShipPlacementStatus();
    }
  }; //reset cells effects


  var resetUnusedCells = function resetUnusedCells() {
    var board = document.getElementById(player.getName());

    for (var i = 0; i < board.children.length; i++) {
      if (board.children[i].classList.contains("invalid")) {
        board.children[i].classList.remove("invalid");
      }

      if (board.children[i].classList.contains("ship-hover")) {
        board.children[i].removeEventListener("click", placeShip);
        board.children[i].classList.remove("ship-hover");
      }
    }
  };

  var afterShipsPlaced = function afterShipsPlaced() {
    var playerBoard = document.getElementById(player.getName());
    playerBoard.classList.toggle("disable");
    var playerStatus = document.getElementById("playerStatus");
    playerStatus.textContent = "Click a square to attack!";
    var cpuBoard = document.getElementById(cpu.getName());
    cpuBoard.classList.toggle("disable");
    updateShipStatus("player", 5);
    updateShipStatus("cpu", 5);
    document.getElementById("orientation").classList.toggle("hidden"); //hover atk effect

    for (var i = 0; i < cpuBoard.children.length; i++) {
      cpuBoard.children[i].classList.add("attack");
    }
  }; //should only be used by olayer since cpu's ships arent shown


  var highlightPlacedShips = function highlightPlacedShips() {
    var playerBoard = document.getElementById(player.getName());
    var shipCoordinates = playerGameboard.getGameboard();

    for (var coordinate in shipCoordinates) {
      for (var i = 0; i < playerBoard.children.length; i++) {
        if (playerBoard.children[i].textContent === coordinate && !playerBoard.children[i].classList.contains("active-ship")) {
          playerBoard.children[i].classList.toggle("active-ship");
          playerBoard.children[i].classList.add("disable");
          break;
        }
      }
    }
  };

  var resetRecentAttack = function resetRecentAttack(name) {
    var board = document.getElementById(name);

    for (var i = 0; i < board.children.length; i++) {
      if (board.children[i].classList.contains("recent-attack")) {
        board.children[i].classList.remove("recent-attack");
        break;
      }
    }
  };

  var highlightAttack = function highlightAttack(name, coordinate, result) {
    var board = document.getElementById(name);
    resetRecentAttack(name);

    for (var i = 0; i < board.children.length; i++) {
      if (board.children[i].textContent === coordinate) {
        result === true ? board.children[i].classList.toggle("hit") : board.children[i].classList.toggle("miss");
        board.children[i].classList.add("recent-attack");
        board.children[i].classList.add("disable");
        break;
      }
    }
  }; //End of game


  var disableBoards = function disableBoards() {
    document.getElementById(player.getName()).classList.add("disable");
    document.getElementById(cpu.getName()).classList.add("disable");
  };

  var winnerAnimation = function winnerAnimation(winner) {
    var statusBar = document.getElementById("".concat(winner, "Status"));

    if (winner === "player") {
      document.getElementById("cpuStatus").textContent = "";
      document.getElementById("cpuShips").textContent = "All ships sunk!";
    } else {
      document.getElementById("playerStatus").textContent = "All ships sunk!";
    }

    statusBar.textContent = "👑 Winner! 👑";
    statusBar.classList.add("winner");
  };

  var gameOver = function gameOver(winner) {
    disableBoards();
    winnerAnimation(winner);
    var button = document.getElementById("reset");
    button.textContent = "Play again";
  };

  var makeButtons = function makeButtons() {
    var buttons = document.createElement("div");
    var playAgain = document.createElement("button");
    buttons.classList.add("buttons");
    playAgain.setAttribute("id", "reset");
    playAgain.addEventListener("click", _index__WEBPACK_IMPORTED_MODULE_0__.newGame);
    playAgain.textContent = "Reset";
    var orientationBtn = document.createElement("button");
    orientationBtn.setAttribute("id", "orientation");
    orientationBtn.textContent = "Rotate ship";
    orientationBtn.addEventListener("click", changeOrientation);
    buttons.appendChild(orientationBtn);
    buttons.appendChild(playAgain);
    return buttons;
  };

  var changeOrientation = function changeOrientation() {
    orientation === "Horizontal" ? orientation = "Vertical" : orientation = "Horizontal";
  };

  var randomOrientation = function randomOrientation() {
    return Math.floor(Math.random() * 2) === 0 ? "Horizontal" : "Vertical";
  };

  var makeStatusBar = function makeStatusBar(name) {
    var statusBar = document.createElement("div");
    statusBar.setAttribute("id", "".concat(name, "Status"));
    statusBar.classList.add("status-bar");

    if (name === "player") {
      statusBar.textContent = "Click a square on your board to place a ship:";
    }

    return statusBar;
  };

  var makeShipStatus = function makeShipStatus(name) {
    var shipStatus = document.createElement("div");
    shipStatus.setAttribute("id", "".concat(name, "Ships"));
    shipStatus.classList.add("ship-status");

    if (name === "player") {
      shipStatus.textContent = "Ships placed: 0 / 5";
    }

    return shipStatus;
  };

  var makeTitle = function makeTitle() {
    var title = document.createElement("div");
    title.setAttribute("id", "title");
    title.textContent = "🚢 BATTLESHIP 🚢";
    return title;
  };

  return {
    setupGame: setupGame,
    makeTitle: makeTitle
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserInterface);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 6 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 8 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 10 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lato&family=Orbitron:wght@700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  background: rgb(233, 233, 233);\n  font-family: \"Lato\", sans-serif;\n}\n\n#container {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n\n#title {\n  height: 15vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 5em;\n  font-family: \"Orbitron\", sans-serif;\n}\n\n#content {\n  display: flex;\n  justify-content: space-around;\n}\n\n.status-bar {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 10vh;\n  font-size: 1.5em;\n}\n\n.buttons {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.gameboard {\n  background: white;\n  display: grid;\n  height: 500px;\n  width: 500px;\n  grid-template-rows: repeat(10, 10%);\n  grid-template-columns: repeat(10, 10%);\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  border: solid 0.3em black;\n}\n\n.active-ship {\n  background: gray;\n}\n\n.hit {\n  background: red;\n}\n\n.miss {\n  background: lightblue;\n}\n\n.ship-hover {\n  background: lightgray;\n  transform: scale(0.9, 0.9);\n}\n\n.board-square {\n  border: 1px solid black;\n  font-size: 0;\n  transition: transform 0.1s, background 0.5s, border 0.1s;\n}\n\n.board-square:hover {\n  transform: scale(0.9, 0.9);\n}\n\n.disable {\n  pointer-events: none;\n}\n\n.invalid {\n  cursor: not-allowed;\n}\n\n.attack:hover {\n  border: 3px solid yellow;\n}\n\n.recent-attack {\n  border: 3px solid yellow;\n}\n\n.hidden {\n  visibility: hidden;\n}\n\n.next-turn {\n  animation-name: pop;\n  animation-duration: 800ms;\n}\n\n.winner {\n  animation-name: pulse;\n  animation-duration: 1400ms;\n  animation-iteration-count: infinite;\n}\n\n.ship-status {\n  height: 10vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.5em;\n}\n\n@keyframes pop {\n  0% {\n    opacity: 0;\n    transform: scale(1, 1);\n  }\n\n  50% {\n    opacity: 100%;\n    transform: scale(2.5, 2.5);\n  }\n\n  100% {\n    /* opacity: 100%; */\n    transform: scale(1, 1);\n  }\n}\n\n@keyframes pulse {\n  0% {\n    transform: scale(1, 1);\n  }\n\n  50% {\n    opacity: 100%;\n    transform: scale(2, 2);\n  }\n\n  100% {\n    transform: scale(1, 1);\n  }\n}\n\nbutton {\n  text-align: center;\n  text-decoration: none;\n  background: white;\n  border: solid 1px black;\n  font-size: 1.2em;\n  padding: 0.4em;\n  border-radius: 0.2em;\n  margin: 1em;\n}\n\nbutton:hover {\n  background: lightgray;\n}\n\nbutton:active {\n  background: gray;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 14 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;