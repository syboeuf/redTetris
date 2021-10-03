const utils = require("../src/server/utils/Game.utils");

test("is valid gamemode", () => {
  expect(utils.isValidGamemode).toBeDefined();
  expect(utils.isValidGamemode("normal")).toBeTruthy();
  expect(utils.isValidGamemode("speed_increase")).toBeTruthy();
  expect(utils.isValidGamemode("score_limit")).toBeTruthy();
  expect(utils.isValidGamemode("indestructible_lines")).toBeTruthy();
  expect(utils.isValidGamemode("speedIncrease")).toBeFalsy();
  expect(utils.isValidGamemode("anothermode")).toBeFalsy();
});

test("get gameboard indestructible lines", () => {
  expect(utils.getGameboardIndestructibleLines).toBeDefined();

  const gameboard = utils.getGameboardIndestructibleLines(
    Array.from(Array(20), () => new Array(10).fill(0)),
    2
  );
  gameboard[18].forEach((cell) => {
    expect(cell).toEqual("a_fixed");
  });
});
