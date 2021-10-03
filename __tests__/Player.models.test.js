const { createGameboard } = require("../src/server/utils/Global.utils");
const Player = require("../src/server/models/Player.models");

test("getUsername", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.getUsername).toBeDefined();
  expect(player.getUsername()).toEqual("Sylvain");
});

test("setGameover", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.setGameover).toBeDefined();
  player.setGameover();
  expect(player.gameover).toEqual(true);
});

test("resetPlayerIndestructibleLines", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.resetPlayerIndestructibleLines).toBeDefined();
  player.resetPlayerIndestructibleLines();
  expect(player.indestructibleLines).toEqual(0);
});

test("initializeSpectator", () => {
  const player = new Player();
  player.initializeSpectator("Sylvain");
  expect(player.initializeSpectator).toBeDefined();
  expect(player.username).toEqual("Sylvain");
  expect(player.isSpectator).toEqual(true);
});

test("updatePlayerPosition", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.updatePlayerPosition).toBeDefined();
  player.updatePlayerPosition(6, 10);
  expect(player.position).toEqual({ x: 6, y: 10 });
});

test("updatePlayerTetriminoIndex", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.updatePlayerTetriminoIndex).toBeDefined();
  player.updatePlayerTetriminoIndex();
  expect(player.tetriminoIndex).toEqual(1);
});

test("initializePlayer", () => {
  const player = new Player();
  expect(player.initializePlayer).toBeDefined();
  player.initializePlayer("Sylvain");
  const gameboardArray = createGameboard();
  expect(player).toEqual({
    username: "Sylvain",
    avatarColor: player.avatarColor,
    gameboard: gameboardArray,
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

test("increasePlayerScore", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.increasePlayerScore).toBeDefined();
  player.increasePlayerScore(10);
  expect(player.score).toEqual(10);
});

test("increasePlayerLines", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.increasePlayerLines).toBeDefined();
  player.increasePlayerLines(2);
  expect(player.lines).toEqual(2);
});

test("updatePlayerLevel", () => {
  const player = new Player();
  player.initializePlayer("Sylvain");
  expect(player.updatePlayerLevel).toBeDefined();
  player.increasePlayerScore(40);

  player.updatePlayerLevel(player, "speed_increase");
  expect(player).toEqual({
    ...player,
    level: 4,
    speedFactor: 1,
    score: 40,
  });
});

test("update player indestructible lines", () => {
  const player1 = new Player();
  const player2 = new Player();
  const player3 = new Player();
  player1.initializePlayer("Sylvain");
  player2.initializePlayer("Thomas");
  player3.initializePlayer("Test");
  expect(player1.updatePlayersIndestructibleLines).toBeDefined();
  player1.indestructibleLines = 3;
  const players = [player1, player2, player3];
  player1.updatePlayersIndestructibleLines(player1.username, players, 2);

  players.forEach((p) => {
    if (p.username !== player1.username) {
      expect(p.indestructibleLines).toEqual(2);
    }
  });
});
