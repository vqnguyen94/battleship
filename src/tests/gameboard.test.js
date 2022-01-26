import Gameboard from "../gameboard";

const gameboard = Gameboard();
gameboard.placeShip(2, [0, 0], "horizontal"); // 0,0 -- 1,0
gameboard.placeShip(2, [0, 1], "vertical"); // 0,1 -- 0,2

test("Receive attack at horiz placed ship coord", () => {
  expect(gameboard.receiveAttack([0, 0])).toBeFalsy();
});

test("Receive attack at vert placed ship coord", () => {
  expect(gameboard.receiveAttack([0, 1])).toBeFalsy();
});

test("Receive attack outside placed ship coord", () => {
  expect(gameboard.receiveAttack([2, 0])).toBeFalsy();
});

test("check for active ships while none are sunk", () => {
  expect(gameboard.determineAllShipsSunk()).toBeFalsy();
});

describe("after sinking both ships", () => {
  test("check if horiz ship sunk", () => {
    expect(gameboard.receiveAttack([1, 0])).toBeTruthy();
  });

  test("check if vert ship sunk", () => {
    expect(gameboard.receiveAttack([0, 2])).toBeTruthy();
  });

  test("check for active ships while all are sunk", () => {
    expect(gameboard.determineAllShipsSunk()).toBeTruthy();
  });
});
