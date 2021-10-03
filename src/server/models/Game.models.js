const Player = require("./Player.models");

class Game {
  constructor() {
    this.id = null;
    this.owner = null;
    this.gamemode = null;
    this.tetriminos = null;
    this.players = null;
    this.spectators = null;
    this.in_progress = null;
    this.winner = null;
  }

  createGame(roomId, username, gamemode = "normal") {
    this.id = roomId;
    this.owner = username;
    this.gamemode = gamemode || "normal";
    this.tetriminos = [];
    this.players = [];
    this.spectators = [];
    this.in_progress = false;
    this.winner = null;
  }

  getRoomId() {
    return this.id;
  }

  getPlayer(username) {
    return this.players.find((p) => p.getUsername() === username);
  }

  deletePlayer(username) {
    const index = this.players.findIndex((r) => r.getUsername() === username);
    if (index !== -1) {
      this.players[index].gameover = true;
      this.players.splice(index, 1);
    }
  }

  getNewOwner(owner) {
    this.owner = owner;
  }

  resetRoom() {
    const playersAndSpecs = [...this.players, ...this.spectators];
    let newPlayers = [];
    playersAndSpecs.forEach((user) => {
      const player = new Player();
      player.initializePlayer(user.username);
      newPlayers.push(player);
    });
    this.tetriminos = [];
    this.players = newPlayers;
    this.spectators = [];
    this.in_progress = false;
    this.winner = null;
  }

  setInProgress() {
    this.in_progress = true;
  }

  setTetriminos(tetriminos) {
    this.tetriminos = [...tetriminos];
  }

  setRoomWinner(player) {
    this.winner = player.username;
    this.in_progress = false;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  addSpectator(spectator) {
    this.spectators.push(spectator);
  }

  removeSpectator(username) {
    const index = this.spectators.findIndex(
      (spec) => spec.username === username
    );

    if (index !== -1) {
      this.spectators.splice(index, 1);
    }
  }

  updateGamemode(gamemode) {
    this.gamemode = gamemode;
  }
}

module.exports = Game;
