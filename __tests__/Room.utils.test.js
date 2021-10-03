const utils = require("../src/server/utils/Room.utils");
const Game = require("../src/server/models/Game.models");
const Player = require("../src/server/models/Player.models");

global.intervals = {};
const room0 = new Game();
const room1 = new Game();
const room2 = new Game();
room0.createGame("room-0", "Thomas");
room1.createGame("room-1", "sylvain");
room2.createGame("room-2", "Tester");
global.rooms = [room0, room1, room2];

const player0 = new Player();
const player1 = new Player();
const player2 = new Player();
const player3 = new Player();
const player4 = new Player();
player0.initializePlayer("Thomas");
player1.initializePlayer("Sylvain");
player2.initializePlayer("Superbot");
player3.initializePlayer("Tester");
player4.initializeSpectator("Spect");
rooms[0].players.push(player0);
rooms[1].players.push(player1);
rooms[1].players.push(player2);
rooms[2].players.push(player3);
rooms[2].addSpectator(player4);

test("get room", () => {
  expect(utils.getRoom).toBeDefined();
  expect(utils.getRoom("room-1")).toEqual(rooms[1]);
});

test("get new owner 2", () => {
  expect(utils.getNewOwner).toBeDefined();
  const newOwner = utils.getNewOwner("room-2", "Tester");
  expect(newOwner).toEqual("Spect");
});

test("delete room", () => {
  expect(utils.deleteRoom).toBeDefined();
  utils.deleteRoom("room-2");
  expect(rooms[2]).not.toBeDefined();
});

test("get player", () => {
  expect(utils.getPlayer).toBeDefined();
  expect(utils.getPlayer("room-0", "Thomas")).toEqual(rooms[0].players[0]);
  expect(utils.getPlayer("room-0", "Robot")).not.toBeDefined();
});

test("get spectator", () => {
  expect(utils.getSpectator).toBeDefined();
  expect(utils.getSpectator("room-0", "Thomas")).toEqual(
    rooms[0].spectators[0]
  );
  expect(utils.getPlayer("room-0", "Robot")).not.toBeDefined();
});

test("delete player", () => {
  expect(utils.deletePlayer).toBeDefined();
  utils.deletePlayer("room-0", "Thomas");
  expect(rooms[0].players.length).toEqual(0);
});

test("get new owner", () => {
  expect(utils.getNewOwner).toBeDefined();
  const newOwner = utils.getNewOwner("room-1", "Sylvain");
  expect(newOwner).toEqual("Superbot");
});

test("get room context", () => {
  expect(utils.getRoomContext).toBeDefined();
  const ctx = utils.getRoomContext({ roomId: "room-1", username: "Sylvain" });
  expect(utils.getRoomContext({})).toEqual(null);
  expect(ctx.room).toEqual(rooms[1]);
  expect(ctx.player).toEqual(rooms[1].players[0]);
});

test("set room winner", () => {
  expect(utils.setRoomWinner).toBeDefined();
  const room = { players: [{ username: "Robot" }] };
  utils.setRoomWinner(room, room.players[0]);
  expect(room.winner).toEqual(room.players[0].username);
});

test("clear room interval", () => {
  expect(utils.clearRoomInterval).toBeDefined();
  intervals["room-1"] = setInterval(() => {}, 100);
  utils.clearRoomInterval({ id: "room-1" });
  expect(intervals["room-1"]).not.toBeDefined();
});

test("reset room", () => {
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
