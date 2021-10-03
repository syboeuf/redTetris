const leave = require("./Leave.handler")

module.exports = function disconnect(io, socket, data) {
    console.log('disconnect •', data)

    if (socket.data && socket.data.username && socket.data.roomId) {
        return leave(io, socket, socket.data)
    }
}