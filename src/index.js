//could make button section just display the end of game message,
//now just styling stuff

//npx webpack --watch

import Gameboard from "./gameboard";
import Player from "./player";
import UserInterface from "./dom";
import "./styles.css";

const Game = (() => {
  const setupGame = () => {
    const player = Player("Viet");
    const cpu = Player("Computer");
    const playerGameboard = Gameboard();
    const cpuGameboard = Gameboard();
    const userInterface = UserInterface(
      player,
      cpu,
      playerGameboard,
      cpuGameboard
    );
    const gameContainer = document.getElementById("container");
    gameContainer.appendChild(userInterface.makeTitle());
    gameContainer.appendChild(userInterface.setupGame());
  };

  setupGame();

  return {
    setupGame,
  };
})();

function newGame() {
  const gameContainer = document.getElementById("container");
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  Game.setupGame();
}

export { newGame };
