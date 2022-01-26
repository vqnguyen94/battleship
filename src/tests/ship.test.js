import Ship from "../ship";

const ship = Ship();
ship.initializeShip([
  [0, 0],
  [0, 1],
]);

test("Ship length: 2", () => {
  expect(ship.shipLength()).toBe(2);
});

describe("before hitting positions", () => {
  test("check if unhit position 1 is false", () => {
    expect(ship.isAlreadyHit("0,0")).toBeFalsy();
  });

  test("check if unhit position 2 is false", () => {
    expect(ship.isAlreadyHit("0,1")).toBeFalsy();
  });

  test("check if out of bounds position is undef", () => {
    expect(ship.isAlreadyHit("0,2")).toBeUndefined();
  });

  test("check if unhit ship is sunk", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
});

describe("after hitting both positions", () => {
  beforeAll(() => {
    ship.hit("0,0");
    ship.hit("0,1");
  });

  test("hit position 1", () => {
    expect(ship.isAlreadyHit("0,0")).toBeTruthy();
  });

  test("hit position 2", () => {
    expect(ship.isAlreadyHit("0,1")).toBeTruthy();
  });

  test("check if all positions hit ship is sunk", () => {
    expect(ship.isSunk()).toBeTruthy();
  });
});
