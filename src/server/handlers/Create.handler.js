const { getRoom } = require("../utils/Room.utils");
const { createNameId } = require("mnemonic-id");
const Game = require("../models/Game.models");

module.exports = function create(io, socket, data) {
  console.log("create •", data);

  const { username, gamemode } = data;
  const roomId = createNameId();

  if (getRoom(username)) {
    return socket.emit("error", {
      message: "Vous avez déjà un salon.",
    });
  }

  let room = new Game();
  room.createGame(roomId, username, gamemode);

  rooms.push(room);
  socket.emit("room_created", { roomId });
  io.emit("rooms", global.rooms);
  socket.emit("info", {
    message: "Vous avez créé une partie.",
  });
};
