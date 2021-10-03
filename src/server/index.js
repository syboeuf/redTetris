const PORT = 4000
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const verbose = true

app.use(cors())

if (!verbose) {
  console.log = function () { }
}

const server = require('http').Server(app)
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  }
})

const create = require('./handlers/Create.handler')
const disconnect = require('./handlers/Disconnect.handler')
const join = require('./handlers/Join.handler')
const play = require('./handlers/Play.handler')
const start = require('./handlers/Start.handler')
const restart = require('./handlers/Restart.handler')
const get_room = require('./handlers/GetRoom.handler')
const update_room = require('./handlers/UpdateRoom.handler')
const rooms = require('./handlers/Rooms.handler')
const leave = require('./handlers/Leave.handler')

global.rooms = []
global.intervals = {}

/**
 * Handle direct API requests below
 * GET, POST, PUT, DELETE
 */

app.get('/highscores', (_req, res) => {
  const highscores = fs.readFileSync('src/server/database/highscores.json', 'utf-8')
  res.json(highscores)
})

/**
 * Manage sockets listeners here and pass
 * data to the handlers
 */

io.on('connection', (socket) => {
  socket
    .on('create', (data) => create(io, socket, data))
    .on('join', (data) => join(io, socket, data))
    .on('play', (data) => play(io, socket, data))
    .on('get_room', (data) => get_room(socket, data))
    .on('update_room', (data) => update_room(io, socket, data))
    .on('rooms', () => rooms(socket))
    .on('start', (data) => start(io, socket, data))
    .on('restart', (data) => restart(io, socket, data))
    .on('leave', (data) => leave(io, socket, data))
    .on('disconnect', (data) => disconnect(io, socket, data))
})

// Launch server
server.listen(PORT, () => {
  console.log('Socket server listening on port ' + PORT)
});