const { getPlayer, getRoomContext } = require("../utils/Room.utils");
const Player = require("../models/Player.models");

module.exports = function join(io, socket, data) {
  console.log("join •", data);

  const { roomId, username } = data;
  const ctx = getRoomContext(data);

  if (!ctx || !ctx.room) {
    return socket.emit("error", {
      message: "Une erreur s'est produite.",
    });
  }

  const notConnected = getPlayer(roomId, username) ? false : true;
  socket.data = { username, roomId };
  if (notConnected) {
    const isGameStarted = ctx.room.in_progress;
    const player = new Player();
    if (isGameStarted) {
      player.initializeSpectator(username);
      ctx.room.addSpectator(player);
    } else {
      player.initializePlayer(username);
      ctx.room.addPlayer(player);
    }
  }
  socket.join(roomId);

  io.in(roomId).emit("room_data", ctx.room);

  socket.emit("info", {
    message: "Vous avez rejoint une partie.",
  });
};
