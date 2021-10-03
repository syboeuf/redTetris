const { getRoomContext } = require('../utils/Room.utils')
const { isValidGamemode } = require('../utils/Game.utils')

module.exports = function start(io, socket, data) {
  console.log('update_room •', data)

  const ctx = getRoomContext(data)

  if (!ctx || !ctx.room) {
    return socket.emit('error', {
      message: "Une erreur s'est produite."
    })
  }

  const { roomId, username, gamemode } = data
  const isAuthorized = ctx.room.owner === username

  if (!isAuthorized || ctx.room.in_progress) {
    return socket.emit('error', {
      message: "Vous n'êtes pas le propriétaire de la partie."
    })
  }

  if (gamemode) {
    if (isValidGamemode(gamemode)) {
      ctx.room.updateGamemode(gamemode)
    }
  }

  io.in(roomId).emit('room_data', ctx.room)
}