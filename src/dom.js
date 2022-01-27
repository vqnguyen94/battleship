import { newGame } from "./index";

const UserInterface = (player, cpu, playerGameboard, cpuGameboard) => {
  const ships = [5, 4, 3, 3, 2];
  const cpuShips = [5, 4, 3, 3, 2];
  let orientation = "Horizontal";

  const setupGame = () => {
    const content = document.createElement("div");
    content.setAttribute("id", "content");

    content.appendChild(playerSetup());
    content.appendChild(makeButtons());
    content.appendChild(cpuSetup());

    return content;
  };

  //Updates message with results of a player's attack
  const updateMessage = (name, result) => {
    const statusBar = document.getElementById(`${name}Status`);
    let message = result === true ? (message = "Hit!") : (message = "Miss!");
    statusBar.textContent = message;
    //Animation for displaying results
    statusBar.classList.remove("next-turn");
    void statusBar.offsetWidth; //no idea what this line actually does, but it helps with restarting the animation
    statusBar.classList.add("next-turn");
  };

  //Updates amount of active ships
  const updateShipStatus = (name, activeShips) => {
    const shipStatus = document.getElementById(`${name}Ships`);
    shipStatus.textContent = `Active ships: ${activeShips} / 5`;
  };

  //Displays to the player how many ships they have left to place
  const updateShipPlacementStatus = () => {
    const shipStatus = document.getElementById("playerShips");
    shipStatus.textContent = `Ships placed: ${5 - ships.length} / 5`;
  };

  //Basic gameboard used by both players
  const makeGameboard = (name) => {
    const gameboard = document.createElement("div");
    gameboard.setAttribute("class", "gameboard");
    gameboard.setAttribute("id", name);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const boardSquare = document.createElement("div");
        boardSquare.setAttribute("class", "board-square");
        boardSquare.textContent = `${i},${j}`;
        gameboard.appendChild(boardSquare);
      }
    }
    return gameboard;
  };

  const playerSetup = () => {
    const playerSection = document.createElement("div");
    playerSection.appendChild(makeStatusBar("player"));
    playerSection.appendChild(makePlayerGameboard());
    playerSection.appendChild(makeShipStatus("player"));

    return playerSection;
  };

  //Player gameboard includes placing ships functionality
  const makePlayerGameboard = () => {
    const gameboard = makeGameboard(player.getName());

    for (let i = 0; i < gameboard.children.length; i++) {
      gameboard.children[i].addEventListener("mouseleave", resetUnusedCells);
      gameboard.children[i].addEventListener(
        "mouseenter",
        validShipPositionCheck
      );
    }

    return gameboard;
  };

  const cpuSetup = () => {
    const cpuSection = document.createElement("div");
    cpuSection.appendChild(makeStatusBar("cpu"));
    cpuSection.appendChild(makeCpuGameboard());
    cpuSection.appendChild(makeShipStatus("cpu"));
    return cpuSection;
  };

  //CPU gameboard involves turn progression/attack functionality
  const makeCpuGameboard = () => {
    const gameboard = makeGameboard(cpu.getName());
    for (let i = 0; i < gameboard.children.length; i++) {
      gameboard.children[i].addEventListener("click", doTurn);
    }
    gameboard.classList.toggle("disable");

    return gameboard;
  };

  //Randomly place ships for CPU
  const placeCpuShips = () => {
    let x, y, shipLength;
    let coordinates = [];
    let randOrientation;
    //While there are still ships in cpuShips array
    while (cpuShips.length != 0) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      randOrientation = randomOrientation();
      coordinates = cpuGameboard.determineShipCoordinates(
        cpuShips[0],
        [x, y],
        randOrientation
      );
      //If coords don't overlap or go out of bounds for previously placed cpu ships, place and higlight the ship
      if (
        !cpuGameboard.determineShipOverlap(coordinates) &&
        cpuGameboard.determineOutOfBounds(coordinates)
      ) {
        shipLength = cpuShips.shift();
        cpuGameboard.placeShip(shipLength, [x, y], randOrientation);
      }
    }
  };

  //Activates when the player presses a square on the CPU board
  const doTurn = (event) => {
    //Disable board to prevent player from clicking immediately after
    document.getElementById(cpu.getName()).classList.add("disable");

    let attackPosition, attackResult, numOfActiveShips;
    [attackPosition, attackResult] = player.attack(
      cpuGameboard,
      event.target.textContent //coordinates of the clicked square
    );
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

  //Similar to player attack except with added delay for effect
  const cpuAttack = () => {
    let attackPosition, attackResult;
    [attackPosition, attackResult] = cpu.randomAttack(playerGameboard);
    setTimeout(updateMessage, 800, "player", attackResult);
    setTimeout(
      highlightAttack,
      800,
      player.getName(),
      attackPosition,
      attackResult
    );
  };

  function enableBoard() {
    document.getElementById(cpu.getName()).classList.remove("disable");
  }

  //For debugging
  const highlightCpuPlacedShips = () => {
    const cpuBoard = document.getElementById("Computer");
    const shipCoordinates = cpuGameboard.getGameboard();

    for (const position in shipCoordinates) {
      for (let i = 0; i < cpuBoard.children.length; i++) {
        if (cpuBoard.children[i].textContent === position) {
          cpuBoard.children[i].classList.toggle("active-ship");
          break;
        }
      }
    }
  };

  const convertStringToArray = (string) => {
    const coordinate = string.split(",");
    let x = parseInt(coordinate[0]);
    let y = parseInt(coordinate[1]);

    return [x, y];
  };

  //Used when player is still placing ships
  const validShipPositionCheck = (event) => {
    let startPosition = convertStringToArray(event.target.textContent);

    //Hypothethical coordinates of the ship to be placed
    const coordinates = playerGameboard.determineShipCoordinates(
      ships[0],
      startPosition,
      orientation
    );

    //Use coordinates to determine if they overlap with any ships or out of bounds
    if (
      !playerGameboard.determineShipOverlap(coordinates) &&
      playerGameboard.determineOutOfBounds(coordinates)
    ) {
      //Activate hover effect if valid
      highlightValidShipPlacement(coordinates);
    } else {
      //Cursor blocked effect for invalid spots
      event.target.classList.add("invalid");
    }
  };

  const highlightValidShipPlacement = (coordinates) => {
    const boardSquare = document.getElementById(player.getName()).children;

    //Go through coordinates and when that coordinate is encountered on the board, highlight it
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = 0; j < boardSquare.length; j++) {
        //Highlight the squares that were checked as valid
        if (boardSquare[j].textContent === String(coordinates[i])) {
          boardSquare[j].classList.add("ship-hover");
          boardSquare[j].addEventListener("click", placeShip);
          break;
        }
      }
    }
  };

  //Attached to squares that are valid for ship placement
  const placeShip = (event) => {
    const shipLength = ships.shift();
    let startPosition = convertStringToArray(event.target.textContent);

    playerGameboard.placeShip(shipLength, startPosition, orientation);
    highlightPlacedShips();
    //No more ships left to place
    if (ships.length === 0) {
      placeCpuShips();
      // highlightCpuPlacedShips();
      afterShipsPlaced();
    } else {
      //Update number of ships to be placed if there are any left
      updateShipPlacementStatus();
    }
  };

  //Reset cells effects for any squares that were previously hovered or deemed invalid
  const resetUnusedCells = () => {
    const board = document.getElementById(player.getName());
    for (let i = 0; i < board.children.length; i++) {
      if (board.children[i].classList.contains("invalid")) {
        board.children[i].classList.remove("invalid");
      }
      if (board.children[i].classList.contains("ship-hover")) {
        board.children[i].removeEventListener("click", placeShip);
        board.children[i].classList.remove("ship-hover");
      }
    }
  };

  const afterShipsPlaced = () => {
    const playerBoard = document.getElementById(player.getName());
    playerBoard.classList.toggle("disable");

    const playerStatus = document.getElementById("playerStatus");
    playerStatus.textContent = "Click a square to attack!";

    const cpuBoard = document.getElementById(cpu.getName());
    cpuBoard.classList.toggle("disable");

    updateShipStatus("player", 5);
    updateShipStatus("cpu", 5);

    document.getElementById("orientation").classList.toggle("hidden");
    //hover atk effect
    for (let i = 0; i < cpuBoard.children.length; i++) {
      cpuBoard.children[i].classList.add("attack");
    }
  };

  //Goes through the player gameboard's coordinates and highlights those coordinates on the board
  const highlightPlacedShips = () => {
    const playerBoard = document.getElementById(player.getName());
    const shipCoordinates = playerGameboard.getGameboard();

    for (const coordinate in shipCoordinates) {
      for (let i = 0; i < playerBoard.children.length; i++) {
        if (
          playerBoard.children[i].textContent === coordinate &&
          !playerBoard.children[i].classList.contains("active-ship")
        ) {
          playerBoard.children[i].classList.toggle("active-ship");
          playerBoard.children[i].classList.add("disable");
          break;
        }
      }
    }
  };

  //Effect that highlights player's most recent attack
  const resetRecentAttack = (name) => {
    const board = document.getElementById(name);
    for (let i = 0; i < board.children.length; i++) {
      if (board.children[i].classList.contains("recent-attack")) {
        board.children[i].classList.remove("recent-attack");
        break;
      }
    }
  };

  //Highlights the results of most recent attack
  const highlightAttack = (name, coordinate, result) => {
    const board = document.getElementById(name);
    resetRecentAttack(name);
    for (let i = 0; i < board.children.length; i++) {
      if (board.children[i].textContent === coordinate) {
        result === true
          ? board.children[i].classList.toggle("hit")
          : board.children[i].classList.toggle("miss");
        board.children[i].classList.add("recent-attack");
        board.children[i].classList.add("disable");
        break;
      }
    }
  };

  //End of game
  const disableBoards = () => {
    document.getElementById(player.getName()).classList.add("disable");
    document.getElementById(cpu.getName()).classList.add("disable");
  };

  const winnerAnimation = (winner) => {
    const statusBar = document.getElementById(`${winner}Status`);
    if (winner === "player") {
      document.getElementById(
        "cpuStatus"
      ).textContent = `"You sunk my battleship! 😭"`;
      document.getElementById("cpuShips").textContent = "All ships sunk!";
    } else {
      document.getElementById("playerShips").textContent = "All ships sunk!";
    }
    statusBar.textContent = "👑 Winner! 👑";
    statusBar.classList.add("winner");
  };

  const gameOver = (winner) => {
    disableBoards();
    winnerAnimation(winner);
    const button = document.getElementById("reset");
    button.textContent = "Play again";
  };

  //Reset and rotate buttons
  const makeButtons = () => {
    const buttons = document.createElement("div");
    const playAgain = document.createElement("button");

    buttons.classList.add("buttons");
    playAgain.setAttribute("id", "reset");
    playAgain.addEventListener("click", newGame);
    playAgain.textContent = "Reset";

    const orientationBtn = document.createElement("button");
    orientationBtn.setAttribute("id", "orientation");
    orientationBtn.textContent = "Rotate ship: ↔️ ";
    orientationBtn.addEventListener("click", changeOrientation);

    buttons.appendChild(orientationBtn);
    buttons.appendChild(playAgain);

    return buttons;
  };

  //Functionality for rotate ship button
  const changeOrientation = () => {
    const button = document.getElementById("orientation");
    orientation === "Horizontal"
      ? (orientation = "Vertical")
      : (orientation = "Horizontal");
    orientation === "Horizontal"
      ? (button.textContent = "Rotate ship: ↔️")
      : (button.textContent = "Rotate ship: ↕️");
  };

  //Used when placing random ships for CPU
  const randomOrientation = () => {
    return Math.floor(Math.random() * 2) === 0 ? "Horizontal" : "Vertical";
  };

  const makeStatusBar = (name) => {
    const statusBar = document.createElement("div");
    statusBar.setAttribute("id", `${name}Status`);
    statusBar.classList.add("status-bar");

    if (name === "player") {
      statusBar.textContent = "Click a square on your board to place a ship.";
    }

    return statusBar;
  };

  const makeShipStatus = (name) => {
    const shipStatus = document.createElement("div");
    shipStatus.setAttribute("id", `${name}Ships`);
    shipStatus.classList.add("ship-status");

    if (name === "player") {
      shipStatus.textContent = "Ships placed: 0 / 5";
    }

    return shipStatus;
  };

  const makeTitle = () => {
    const title = document.createElement("div");
    title.setAttribute("id", "title");
    title.textContent = "🚢 BATTLESHIP 🚢";
    return title;
  };

  return {
    setupGame,
    makeTitle,
  };
};

export default UserInterface;
