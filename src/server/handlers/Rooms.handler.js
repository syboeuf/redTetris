module.exports = function rooms(socket) {
  socket.emit('rooms', global.rooms)
}