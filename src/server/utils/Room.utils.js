const Player = require("../models/Player.models");

function getRoom(roomId) {
  return rooms.find((r) => r.id === roomId);
}

function deleteRoom(roomId) {
  const index = rooms.findIndex((r) => r.id === roomId);
  const room = getRoom(roomId);
  if (index >= 0 && room) {
    clearRoomInterval(room);
    rooms.splice(index, 1);
  }
}

function getPlayer(roomId, username) {
  const room = getRoom(roomId);
  return room?.players.find((p) => p.getUsername() === username);
}

function deletePlayer(roomId, username) {
  const room = getRoom(roomId);
  const index = room.players.findIndex((r) => r.getUsername() === username);
  room?.players.splice(index, 1);
}

function getNewOwner(roomId, owner) {
  const room = getRoom(roomId);
  const player = room?.players.find(
    (p) => p?.getUsername() !== owner
  )?.username;
  const spectator = room?.spectators.find(
    (p) => p?.getUsername() !== owner
  )?.username;
  if (player) {
    return player;
  } else if (spectator) {
    return spectator;
  }
}

function resetRoom(room) {
  const playersAndSpecs = [...room.players, ...room.spectators];

  let newPlayers = [];
  playersAndSpecs.forEach((user) => {
    const player = new Player();
    ctx.room.players.push(player.initializePlayer(user.username));
    newPlayers.push(player);
  });

  room.tetriminos = [];
  room.players = newPlayers;
  room.spectators = [];
  room.in_progress = false;
  room.winner = null;
}

function getRoomContext(data) {
  if (!data || !data.roomId || !data.username) {
    return null;
  }

  const { roomId, username } = data;
  return {
    room: getRoom(roomId),
    player: getPlayer(roomId, username) || getSpectator(roomId, username),
  };
}

function getSpectator(roomId, username) {
  const room = getRoom(roomId);
  return room?.spectators.find((p) => p.getUsername() === username);
}

async function setRoomWinner(room, player) {
  room.winner = player.username;
  room.in_progress = false;
}

function clearRoomInterval(room) {
  if (intervals?.[room.id]) {
    clearInterval(intervals[room.id]);
    delete intervals[room.id];
  }
}

module.exports = {
  getRoomContext,
  getRoom,
  deleteRoom,
  resetRoom,
  setRoomWinner,
  getPlayer,
  getNewOwner,
  deletePlayer,
  clearRoomInterval,
  getSpectator,
};
