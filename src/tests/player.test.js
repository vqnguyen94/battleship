import Player from "../player";

test("get player name", () => {
  const player = Player("Viet");
  expect(player.getName()).toBe("Viet");
});

test("get computer name", () => {
  const computer = Player("Computer");
  expect(computer.getName()).toBe("Computer");
});
