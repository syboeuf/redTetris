const { handleMoveDown } = require("../utils/Move.utils");
const { getRoomContext } = require("../utils/Room.utils");
const { getRandomTetrimino } = require("../utils/Tetriminos.utils");

module.exports = function start(io, socket, data) {
  console.log("start •", data);

  const ctx = getRoomContext(data);
  if (!ctx || !ctx.room || !ctx.player) {
    return socket.emit("error", {
      message: "Une erreur s'est produite.",
    });
  }

  const { roomId, username } = data;
  const isAuthorized = ctx.room.owner === username;
  const players = ctx.room.players;

  if (!isAuthorized) {
    return socket.emit("error", {
      message: "Vous n'êtes pas le propriétaire de la partie.",
    });
  }

  if (ctx.room.in_progress) {
    return socket.emit("error", {
      message: "La partie est déjà en cours.",
    });
  }

  ctx.room.setInProgress();
  ctx.room.setTetriminos(getRandomTetrimino(500));

  const isIndestructibleLinesMode =
    ctx.room.gamemode === "indestructible_lines";

  if (isIndestructibleLinesMode) {
    let minimumScore = 20;

    intervals[ctx.room.id] = setInterval(() => {
      players.forEach((player) => {
        if (player.score < minimumScore) {
          player.indestructibleLines += 1;
        }
        minimumScore += 20;
      });
    }, 30000); // 30s
  }

  // Set first tetrimino instance for all players
  players.forEach((player) => {
    const defaultIntervalDelay = 1000;
    let intervalDelay = defaultIntervalDelay;
    player.setTetrimino(ctx.room.tetriminos[player.tetriminoIndex]);
    player.setNextTetrimino(ctx.room.tetriminos[player.tetriminoIndex + 1]);
    player.drop = function () {
      setTimeout(() => {
        if (player.gameover || ctx.room.winner) {
          return;
        }
        const { lastMove } = player;
        const isLastMoveArrowDown =
          lastMove.move && lastMove.move === "ArrowDown";
        const isUnderDelay =
          lastMove.timestamp &&
          Date.now() - lastMove.timestamp < intervalDelay / 2;
        const isSpeedIncreaseMode = ctx.room.gamemode === "speed_increase";
        const isValidSpeedFactor =
          player.speedFactor &&
          player.speedFactor >= 1 &&
          player.speedFactor <= 10;

        // Define new interval delay depending on level speed factor
        if (isSpeedIncreaseMode && isValidSpeedFactor) {
          intervalDelay = Math.ceil(defaultIntervalDelay / player.speedFactor);
        }

        if (isLastMoveArrowDown && isUnderDelay) {
          // Skip automatic drop because user is already dropping the piece fast
          return setTimeout(player.drop, intervalDelay / 2);
        }

        handleMoveDown({ room: ctx.room, player });
        io.in(roomId).emit("room_data", ctx.room);

        player.drop();
      }, intervalDelay);
    };
    player.drop();
  });

  io.in(roomId).emit("room_data", ctx.room);

  io.in(roomId).emit("info", {
    message: "La partie commence, bonne chance !",
  });
};
