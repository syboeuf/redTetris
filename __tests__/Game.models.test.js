const Game = require("../src/server/models/Game.models");
const Player = require("../src/server/models/Player.models");

test("createGame", () => {
  const room = new Game();
  expect(room.createGame).toBeDefined();
  room.createGame("room-1", "sylvain");
  expect(room).toEqual({
    id: "room-1",
    owner: "sylvain",
    gamemode: "normal",
    tetriminos: [],
    players: [],
    spectators: [],
    in_progress: false,
    winner: null,
  });
});

test("getRoomId", () => {
  const room = new Game();
  expect(room.getRoomId).toBeDefined();
  room.createGame("room-1", "sylvain");
  expect(room.getRoomId()).toEqual("room-1");
});

test("getNewOwner", () => {
  const room = new Game();
  expect(room.getNewOwner).toBeDefined();
  room.createGame("room-1", "sylvain");
  room.getNewOwner("Thomas");
  expect(room.owner).toEqual("Thomas");
});

test("setInProgress", () => {
  const room = new Game();
  expect(room.setInProgress).toBeDefined();
  room.createGame("room-1", "sylvain");
  room.setInProgress();
  expect(room.in_progress).toEqual(true);
});

test("updateGamemode", () => {
  const room = new Game();
  expect(room.updateGamemode).toBeDefined();
  room.createGame("room-1", "sylvain");
  room.updateGamemode("speed_increase");
  expect(room.gamemode).toEqual("speed_increase");
});

test("addPlayer", () => {
  const room = new Game();
  expect(room.addPlayer).toBeDefined();
  room.createGame("room-1", "sylvain");
  const player = new Player();
  player.initializePlayer("Sylvian");
  room.addPlayer(player);
  expect(room.players).toEqual([player]);
});

test("addSpectator", () => {
  const room = new Game();
  expect(room.addSpectator).toBeDefined();
  room.createGame("room-1", "sylvain");
  const player = new Player();
  player.initializeSpectator("Test");
  room.addSpectator(player);
  expect(room.spectators).toEqual([player]);
});

test("setRoomWinner", () => {
  const room = new Game();
  expect(room.setRoomWinner).toBeDefined();
  room.createGame("room-1", "sylvain");
  const player = { username: "sylvain" };
  room.setRoomWinner(player);
  expect(room.winner).toEqual("sylvain");
  expect(room.in_progress).toEqual(false);
});

test("resetRoom", () => {
  const room = new Game();
  room.createGame("Test", "Sylvain");
  expect(room.resetRoom).toBeDefined();

  const players = [{ username: "bot_1" }, { username: "bot_2" }];
  const spectators = [{ username: "bot_3" }];
  room.players = players;
  room.spectators = spectators;
  room.resetRoom();

  expect(room.players.length).toEqual(3);
  delete room.players;
  expect(room).toEqual({
    id: "Test",
    owner: "Sylvain",
    gamemode: "normal",
    tetriminos: [],
    spectators: [],
    in_progress: false,
    winner: null,
  });
});

test("removeSpectator", () => {
  const room = new Game();
  room.createGame("Test", "Sylvain");
  expect(room.removeSpectator).toBeDefined();

  const player1 = new Player();
  const player2 = new Player();
  player1.initializePlayer("Sylvain");
  player2.initializeSpectator("Thomas");
  room.addPlayer(player1);
  room.addSpectator(player2);
  room.removeSpectator("Thomas");

  expect(room.players.length).toEqual(1);
  expect(room.spectators.length).toEqual(0);
  expect(room).toEqual({
    id: "Test",
    owner: "Sylvain",
    gamemode: "normal",
    players: [player1],
    tetriminos: [],
    spectators: [],
    in_progress: false,
    winner: null,
  });
});

test("getPlayer", () => {
  const room = new Game();
  room.createGame("Test", "Sylvain");
  expect(room.getPlayer).toBeDefined();

  const player1 = new Player();
  player1.initializePlayer("Sylvain");
  room.addPlayer(player1);

  expect(room.getPlayer("Sylvain")).toEqual(player1);
});

test("deletePlayer", () => {
  const room = new Game();
  room.createGame("Test", "Sylvain");
  expect(room.deletePlayer).toBeDefined();

  const player1 = new Player();
  const player2 = new Player();
  player1.initializePlayer("Sylvain");
  player2.initializePlayer("Thomas");
  room.addPlayer(player1);
  room.addPlayer(player2);

  room.deletePlayer("Thomas");
  expect(room.players.length).toEqual(1);
  expect(room.spectators.length).toEqual(0);
  expect(room).toEqual({
    id: "Test",
    owner: "Sylvain",
    gamemode: "normal",
    players: [player1],
    tetriminos: [],
    spectators: [],
    in_progress: false,
    winner: null,
  });
});
