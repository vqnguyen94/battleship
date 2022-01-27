//Object where keys are coordinates and values are the ship
import Ship from "./ship";

const Gameboard = () => {
  const gameboard = {};
  const activeShips = [];

  const placeShip = (shipLength, position, orientation) => {
    //Coordinates is array of [x,y] based on initial position and orientation
    const coordinates = determineShipCoordinates(
      shipLength,
      position,
      orientation
    );

    //Make a new ship and intialize it with coordinates
    const ship = Ship();
    ship.initializeShip(coordinates);

    activeShips.push(shipLength);

    //Gameboard contains all ship coordinates and each coordinate corresponds to its respective ship
    for (let i = 0; i < coordinates.length; i++) {
      const key = String(coordinates[i]);
      gameboard[key] = ship;
    }
  };

  const receiveAttack = (position) => {
    let key = String(position);

    //If coordinate exists in the gameboard, a ship is hit
    if (key in gameboard) {
      const ship = gameboard[key];
      ship.hit(key);
      //If attack sinks the ship, remove that ship (corresponding to shiplength) from active ships
      if (ship.isSunk()) {
        activeShips.splice(activeShips.indexOf(ship.shipLength), 1);
      }
      return [key, true];
    }

    //Attack was a miss
    return [key, false];
  };

  const determineShipCoordinates = (shipLength, startPosition, orientation) => {
    const coordinates = [];
    let x, y;
    [x, y] = startPosition;

    //Vertical
    if (orientation === "Vertical") {
      let endPosition = x + shipLength;
      while (x < endPosition) {
        coordinates.push([x, y]);
        x++;
      }
    }
    //Horizontal
    else {
      let endPosition = y + shipLength;
      while (y < endPosition) {
        coordinates.push([x, y]);
        y++;
      }
    }
    return coordinates;
  };

  const determineShipOverlap = (coordinates) => {
    for (let i = 0; i < coordinates.length; i++) {
      const key = String(coordinates[i]);
      if (key in gameboard) {
        return true;
      }
    }

    return false;
  };

  const determineOutOfBounds = (coordinates) => {
    let x, y;
    for (let i = 0; i < coordinates.length; i++) {
      [x, y] = coordinates[i];
      if (x > 9 || y > 9) {
        return false;
      }
    }

    return true;
  };

  const determineAllShipsSunk = () => activeShips.length;

  const getGameboard = () => gameboard;

  return {
    determineShipCoordinates,
    determineOutOfBounds,
    determineShipOverlap,
    placeShip,
    receiveAttack,
    determineAllShipsSunk,
    getGameboard,
  };
};

export default Gameboard;
