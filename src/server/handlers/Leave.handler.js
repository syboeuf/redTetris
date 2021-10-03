const {
  getNewOwner,
  deleteRoom,
  getRoomContext,
} = require("../utils/Room.utils");
const { pushToHighscores } = require("../utils/Global.utils");

module.exports = function leave(io, socket, data) {
  console.log("leave •", data);

  const ctx = getRoomContext(data);

  if (!ctx || !ctx.room || !ctx.player) {
    return socket.emit("error", {
      message: "Une erreur s'est produite.",
    });
  }
  const { id: roomId } = ctx.room;
  const { username } = ctx.player;
  const totalPlayers = ctx.room.players.length + ctx.room.spectators.length;
  const isSinglePlayer = totalPlayers === 1;
  const isMulti = ctx.room.players.length === 2;

  if (isMulti && ctx.room.in_progress) {
    const playerLeft = ctx.room.players.find(
      (p) => p?.getUsername() !== username
    );
    ctx.room.setRoomWinner(playerLeft);
    pushToHighscores(playerLeft.username, ctx.room.gamemode, playerLeft.score);
  }

  ctx.room.removeSpectator(username);
  ctx.room.deletePlayer(username);

  if (isSinglePlayer) {
    deleteRoom(roomId);
    return socket.broadcast.emit("rooms", global.rooms);
  }

  if (ctx.room.owner === username) {
    const isSpectator = ctx.room.spectators.length > 0;
    if (isSpectator) {
      ctx.room.resetRoom();
    }
    const newOwner = getNewOwner(roomId, username);
    ctx.room.getNewOwner(newOwner);
  }

  io.in(roomId).emit("room_data", ctx.room);
  socket.emit("info", {
    message: "Vous avez quitté la partie.",
  });
};
