const {
  createGameboard,
  getRandomAvatarColor,
} = require("../utils/Global.utils");

const levels = {
  0: {
    score: 0,
    speedFactor: 1,
  },
  1: {
    score: 10,
    speedFactor: 2,
  },
  2: {
    score: 20,
    speedFactor: 3,
  },
  3: {
    score: 30,
    speedFactor: 4,
  },
  4: {
    score: 40,
    speedFactor: 5,
  },
  5: {
    score: 50,
    speedFactor: 6,
  },
};

class Player {
  constructor() {
    this.username = null;
    this.avatarColor = null;
    this.gameboard = null;
    this.tetriminoIndex = null;
    this.tetrimino = null;
    this.nextTetrimino = null;
    this.level = null;
    this.lines = null;
    this.score = null;
    this.position = null;
    this.lastMove = null;
    this.isSpectator = null;
    this.speedFactor = null;
    this.gameover = null;
    this.indestructibleLines = null;
  }

  initializePlayer(username) {
    this.username = username;
    this.avatarColor = getRandomAvatarColor();
    this.gameboard = createGameboard();
    this.tetriminoIndex = 0;
    this.tetrimino = null;
    this.nextTetrimino = null;
    this.level = 0;
    this.lines = 0;
    this.score = 0;
    this.position = {
      x: 4,
      y: 0,
    };
    this.lastMove = {
      move: null,
      timestamp: null,
    };
    this.isSpectator = false;
    this.speedFactor = 1;
    this.gameover = false;
    this.indestructibleLines = 0;
  }

  increasePlayerScore(score) {
    this.score += score;
  }

  increasePlayerLines(lines = 1) {
    this.lines += lines;
  }

  updatePlayerLevel(gamemode) {
    for (const level in levels) {
      if (this.score >= levels[level].score) {
        this.level = parseInt(level);

        if (gamemode === "speed_increase") {
          this.speedFactor = levels[level].speedFactor;
        }
      } else return;
    }
  }

  updatePlayerGameboard(gameboard) {
    this.gameboard = gameboard;
  }

  updatePlayerPosition(x, y) {
    this.position = { x, y };
  }

  updatePlayerTetriminoIndex() {
    this.tetriminoIndex++;
  }

  updateLastMove(move) {
    this.lastMove = {
      move,
      timestamp: Date.now(),
    };
  }

  updatePlayersIndestructibleLines(username, players, lines = 0) {
    if (lines > 0) {
      players.forEach((player) => {
        if (player.username !== username) {
          player.indestructibleLines += lines;
        }
      });
    }
  }

  updateTetrimino(tetrimino) {
    this.tetrimino = tetrimino;
  }

  resetPlayerIndestructibleLines() {
    this.indestructibleLines = 0;
  }

  initializeSpectator(username) {
    this.username = username;
    this.avatarColor = getRandomAvatarColor();
    this.isSpectator = true;
  }

  getUsername() {
    return this.username;
  }

  setTetrimino(tetrimino) {
    this.tetrimino = tetrimino;
  }

  setNextTetrimino(tetrimino) {
    this.nextTetrimino = tetrimino;
  }

  setGameover() {
    this.gameover = true;
  }
}

module.exports = Player;
