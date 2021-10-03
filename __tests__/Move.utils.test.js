const utils = require("../src/server/utils/Move.utils");
const Game = require("../src/server/models/Game.models");
const Player = require("../src/server/models/Player.models");

test("is valid move", () => {
  expect(utils.isValidMove).toBeDefined();
  expect(utils.isValidMove("ArrowUp")).toBeTruthy();
  expect(utils.isValidMove("ArrowDown")).toBeTruthy();
  expect(utils.isValidMove("ArrowRight")).toBeTruthy();
  expect(utils.isValidMove("ArrowLeft")).toBeTruthy();
  expect(utils.isValidMove("Space")).toBeTruthy();
  expect(utils.isValidMove("42")).toBeFalsy();
  expect(utils.isValidMove("")).toBeFalsy();
});

test("set last move", async () => {
  expect(utils.handleTetriminoMove).toBeDefined();

  const player = new Player();
  player.initializePlayer("sylvain");
  const ctx = { player };
  await utils.handleTetriminoMove(ctx, "ArrowRight");

  expect(ctx.player.lastMove.move).toEqual("ArrowRight");
  expect(ctx.player.lastMove.timestamp).toBeDefined();
});

test("handleRotatePiece", () => {
  expect(utils.handleRotatePiece).toBeDefined();

  const player = new Player();
  player.initializePlayer("sylvain");
  player.score = 10;
  player.position = { x: 4, y: 6 };
  player.tetrimino = [
    [0, "l", 0],
    [0, "l", 0],
    [0, "l", "l"],
  ];
  const ctx = {
    room: {
      gamemode: "normal",
    },
    player,
  };

  utils.handleRotatePiece(ctx);
  const expectResponse = [
    { x: 6, y: 3, cell: "l" },
    { x: 4, y: 4, cell: "l" },
    { x: 5, y: 4, cell: "l" },
    { x: 6, y: 4, cell: "l" },
    { x: 6, y: 18, cell: "l_location" },
    { x: 4, y: 19, cell: "l_location" },
    { x: 5, y: 19, cell: "l_location" },
    { x: 6, y: 19, cell: "l_location" },
  ];
  expectResponse.forEach(({ x, y, cell }) => {
    expect(ctx.player.gameboard[y][x]).toEqual(cell);
  });
});

test("fixTetrimino", async () => {
  expect(utils.fixTetrimino).toBeDefined();

  try {
    const room = new Game();
    room.createGame("test", "sylvain");
    const player = new Player();
    player.initializePlayer("sylvain");
    player.score = 10;
    player.position = { x: 4, y: 6 };
    player.tetrimino = [
      [0, "l", 0],
      [0, "l", 0],
      [0, "l", "l"],
    ];
    const ctx = {
      room,
      player,
    };

    await utils.fixTetrimino(ctx);
    const expectResponse = [
      { x: 5, y: 17, cell: "l_fixed" },
      { x: 5, y: 18, cell: "l_fixed" },
      { x: 5, y: 19, cell: "l_fixed" },
      { x: 6, y: 19, cell: "l_fixed" },
    ];
    expectResponse.forEach(({ x, y, cell }) => {
      expect(ctx.player.gameboard[y][x]).toEqual(cell);
    });
  } catch (error) {
    console.log(error);
  }
});

test("handleMoveDown", async () => {
  expect(utils.handleMoveDown).toBeDefined();

  try {
    const room = new Game();
    room.createGame("test", "sylvain");
    const player = new Player();
    player.initializePlayer("sylvain");
    player.score = 10;
    player.position = { x: 4, y: 20 };
    player.tetriminoIndex = 0;
    player.tetrimino = [
      [0, "l", 0],
      [0, "l", 0],
      [0, "l", "l"],
    ];
    const ctx = {
      room,
      player,
    };

    await utils.handleMoveDown(ctx);
    const expectResponse = [
      { x: 5, y: 17, cell: "l_fixed" },
      { x: 5, y: 18, cell: "l_fixed" },
      { x: 5, y: 19, cell: "l_fixed" },
      { x: 6, y: 19, cell: "l_fixed" },
    ];
    expectResponse.forEach(({ x, y, cell }) => {
      expect(ctx.player.gameboard[y][x]).toEqual(cell);
    });
  } catch (error) {
    console.log(error);
  }
});

test("handleMoveRight", async () => {
  expect(utils.handleTetriminoMove).toBeDefined();

  try {
    const room = new Game();
    room.createGame("test", "sylvain");
    const player = new Player();
    player.initializePlayer("sylvain");
    player.score = 10;
    player.position = { x: 4, y: 6 };
    player.tetriminoIndex = 0;
    player.tetrimino = [
      [0, "l", 0],
      [0, "l", 0],
      [0, "l", "l"],
    ];
    const ctx = {
      room,
      player,
    };

    await utils.handleTetriminoMove(ctx, "ArrowRight");
    const expectResponse = [
      { x: 6, y: 3, cell: "l" },
      { x: 6, y: 4, cell: "l" },
      { x: 6, y: 5, cell: "l" },
      { x: 7, y: 5, cell: "l" },
    ];
    expectResponse.forEach(({ x, y, cell }) => {
      expect(ctx.player.gameboard[y][x]).toEqual(cell);
    });
  } catch (error) {
    console.log(error);
  }
});

test("handleMoveLeft", async () => {
  expect(utils.handleTetriminoMove).toBeDefined();

  try {
    const room = new Game();
    room.createGame("test", "sylvain");
    const player = new Player();
    player.initializePlayer("sylvain");
    player.score = 10;
    player.position = { x: 4, y: 6 };
    player.tetriminoIndex = 0;
    player.tetrimino = [
      [0, "l", 0],
      [0, "l", 0],
      [0, "l", "l"],
    ];
    const ctx = {
      room,
      player,
    };

    await utils.handleTetriminoMove(ctx, "ArrowLeft");
    const expectResponse = [
      { x: 4, y: 3, cell: "l" },
      { x: 4, y: 4, cell: "l" },
      { x: 4, y: 5, cell: "l" },
      { x: 5, y: 5, cell: "l" },
    ];
    expectResponse.forEach(({ x, y, cell }) => {
      expect(ctx.player.gameboard[y][x]).toEqual(cell);
    });
  } catch (error) {
    console.log(error);
  }
});

test("ArrowUp", async () => {
  expect(utils.handleTetriminoMove).toBeDefined();

  try {
    const room = new Game();
    room.createGame("test", "sylvain");
    const player = new Player();
    player.initializePlayer("sylvain");
    player.score = 10;
    player.position = { x: 4, y: 6 };
    player.tetriminoIndex = 0;
    player.tetrimino = [
      [0, "l", 0],
      [0, "l", 0],
      [0, "l", "l"],
    ];
    const ctx = {
      room,
      player,
    };

    await utils.handleTetriminoMove(ctx, "ArrowUp");
    const expectResponse = [
      { x: 6, y: 3, cell: "l" },
      { x: 4, y: 4, cell: "l" },
      { x: 5, y: 4, cell: "l" },
      { x: 6, y: 4, cell: "l" },
      { x: 6, y: 18, cell: "l_location" },
      { x: 4, y: 19, cell: "l_location" },
      { x: 5, y: 19, cell: "l_location" },
      { x: 6, y: 19, cell: "l_location" },
    ];
    expectResponse.forEach(({ x, y, cell }) => {
      expect(ctx.player.gameboard[y][x]).toEqual(cell);
    });
  } catch (error) {
    console.log(error);
  }
});
