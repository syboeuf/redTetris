const utils = require("../src/server/utils/Player.utils");

test("increase player score", () => {
  expect(utils.increasePlayerScore).toBeDefined();

  let player = { score: 50 };
  utils.increasePlayerScore(player, 10);

  expect(player.score).toEqual(60);
});

test("increase player lines", () => {
  expect(utils.increasePlayerLines).toBeDefined();

  let player = { lines: 5 };

  utils.increasePlayerLines(player, 3);
  expect(player.lines).toEqual(8);

  utils.increasePlayerLines(player);
  expect(player.lines).toEqual(9);
});

test("increase player level", () => {
  expect(utils.updatePlayerLevel).toBeDefined();

  let player = { level: 3, speedFactor: 4, score: 40 };

  utils.updatePlayerLevel(player, "speed_increase");
  expect(player).toEqual({ level: 4, speedFactor: 5, score: 40 });
});

test("update player gameboard", () => {
  expect(utils.updatePlayerGameboard).toBeDefined();

  let player = { gameboard: [0, 0, 0, 0, 0] };

  utils.updatePlayerGameboard(player, [0, 0, "a", 0, 0]);
  expect(player.gameboard).toEqual([0, 0, "a", 0, 0]);
});

test("update player position", () => {
  expect(utils.updatePlayerPosition).toBeDefined();

  let player = { position: { x: 0, y: 0 } };

  utils.updatePlayerPosition(player, 5, 8);
  expect(player.position).toEqual({ x: 5, y: 8 });
});

test("update player indestructible lines", () => {
  expect(utils.updatePlayersIndestructibleLines).toBeDefined();

  let username = "unit_test";
  let players = [
    { username: "unit_test", indestructibleLines: 3 },
    { username: "bot_1", indestructibleLines: 0 },
    { username: "bot_2", indestructibleLines: 0 },
  ];

  utils.updatePlayersIndestructibleLines(username, players, 2);

  players.forEach((player) => {
    if (player.username !== username) {
      expect(player.indestructibleLines).toEqual(2);
    }
  });
});

test("update player indestructible lines", () => {
  expect(utils.resetPlayerIndestructibleLines).toBeDefined();

  let player = { indestructibleLines: 10 };

  utils.resetPlayerIndestructibleLines(player);
  expect(player.indestructibleLines).toEqual(0);
});

test("initialize player", () => {
  expect(utils.initializePlayer).toBeDefined();

  const player = utils.initializePlayer("unit_test");

  expect(player.avatarColor).toMatch(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/);
  delete player.avatarColor;

  expect(player.gameboard).toEqual(
    Array.from(Array(20), () => new Array(10).fill(0))
  );
  delete player.gameboard;

  expect(player).toEqual({
    username: "unit_test",
    tetriminoIndex: 0,
    tetrimino: null,
    nextTetrimino: null,
    level: 0,
    lines: 0,
    score: 0,
    position: {
      x: 4,
      y: 0,
    },
    lastMove: {
      move: null,
      timestamp: null,
    },
    isSpectator: false,
    speedFactor: 1,
    gameover: false,
    indestructibleLines: 0,
  });
});

test("initialize spectator", () => {
  expect(utils.initializeSpectator).toBeDefined();

  const spectator = utils.initializeSpectator("unit_test");
  expect(spectator.username).toEqual("unit_test");
  expect(spectator.isSpectator).toBeTruthy();
  expect(spectator.avatarColor).toMatch(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/);
});
