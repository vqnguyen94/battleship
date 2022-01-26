//Object where coordinate string is the key and true/false values signify a hit/miss
const Ship = () => {
  const ship = {};
  let length;

  //Initialize coordinates as false/unhit
  const initializeShip = (coordinates) => {
    for (let i = 0; i < coordinates.length; i++) {
      const key = String(coordinates[i]);
      ship[key] = false;
    }
    length = coordinates.length;
  };

  const hit = (position) => {
    ship[position] = true;
  };

  //If there is a single coordinate that is false/unhit, then the ship is still active
  const isSunk = () => {
    for (const key in ship) {
      if (ship[key] === false) {
        return false;
      }
    }
    return true;
  };

  const shipLength = () => length;

  return { hit, isSunk, initializeShip, shipLength };
};

export default Ship;
