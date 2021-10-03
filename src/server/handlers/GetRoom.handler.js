const { getRoom } = require("../utils/Room.utils")

module.exports = function get_room(socket, data) {
  console.log('get_room •', data)

  const { roomId } = data
  const room = getRoom(roomId)

  if (!room) {
    return socket.emit('room_not_found')
  }

  socket.emit('room_data', room)
}