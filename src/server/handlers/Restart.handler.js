const { getRoomContext } = require("../utils/Room.utils");

module.exports = function restart(io, socket, data) {
  console.log("restart •", data);

  const ctx = getRoomContext(data);

  if (!ctx || !ctx.room || !ctx.player) {
    return socket.emit("error", {
      message: "Une erreur s'est produite.",
    });
  }

  const isAuthorized = ctx.room.owner === data.username;

  if (!isAuthorized) {
    return socket.emit("error", {
      message: "Vous n'êtes pas le propriétaire de la partie.",
    });
  }

  ctx.room.resetRoom();

  io.in(data.roomId).emit("room_data", ctx.room);
};
