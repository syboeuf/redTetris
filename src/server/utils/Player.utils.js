const { createGameboard, getRandomAvatarColor } = require("./Global.utils")

const levels = {
  0: {
    score: 0,
    speedFactor: 1
  },
  1: {
    score: 10,
    speedFactor: 2
  },
  2: {
    score: 20,
    speedFactor: 3
  },
  3: {
    score: 30,
    speedFactor: 4
  },
  4: {
    score: 40,
    speedFactor: 5
  },
  5: {
    score: 50,
    speedFactor: 6
  },
}

function increasePlayerScore(player, score) {
  player.score += score
}

function increasePlayerLines(player, lines = 1) {
  player.lines += lines
}

function updatePlayerLevel(player, gamemode) {
  for (const level in levels) {
    if (player.score >= levels[level].score) {
      player.level = parseInt(level)

      if (gamemode === 'speed_increase') {
        player.speedFactor = levels[level].speedFactor
      }
    } else return
  }
}

function updatePlayerGameboard(player, gameboard) {
  player.gameboard = gameboard
}

function updatePlayerPosition(player, x, y) {
  player.position = { x, y }
}

function updatePlayersIndestructibleLines(username, players, lines = 0) {
  if (lines > 0) {
    players.forEach((player) => {
      if (player.username !== username) {
        player.indestructibleLines += lines
      }
    })
  }
}

function resetPlayerIndestructibleLines(player) {
  return player.indestructibleLines = 0
}

function initializePlayer(username) {
  return {
    username,
    avatarColor: getRandomAvatarColor(),
    gameboard: createGameboard(),
    tetriminoIndex: 0,
    tetrimino: null,
    nextTetrimino: null,
    level: 0,
    lines: 0,
    score: 0,
    position: {
      x: 4,
      y: 0,
    },
    lastMove: {
      move: null,
      timestamp: null,
    },
    isSpectator: false,
    speedFactor: 1,
    gameover: false,
    indestructibleLines: 0
  }
}

function initializeSpectator(username) {
  return {
    username,
    avatarColor: getRandomAvatarColor(),
    isSpectator: true
  }
}

module.exports = {
  initializePlayer,
  initializeSpectator,
  increasePlayerScore,
  increasePlayerLines,
  updatePlayerPosition,
  updatePlayerGameboard,
  updatePlayerLevel,
  updatePlayersIndestructibleLines,
  resetPlayerIndestructibleLines
}