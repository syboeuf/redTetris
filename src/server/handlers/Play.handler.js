const { handleTetriminoMove } = require("../utils/Move.utils");
const { getRoomContext } = require("../utils/Room.utils");

module.exports = function play(io, socket, data) {
  console.log("play •", data);
  const ctx = getRoomContext(data);

  if (!ctx || !ctx.room || !ctx.player) {
    return socket.emit("error", {
      message: "Une erreur s'est produite.",
    });
  }

  if (ctx.player.gameover || ctx.room.winner) {
    return;
  }

  handleTetriminoMove(ctx, data.move);

  io.in(data.roomId).emit("room_data", ctx.room);
};
