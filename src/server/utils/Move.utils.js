const {
  placeTetrimino,
  spawnNewTetrimino,
  checkTetriminoCollision,
  clearFullLines,
  findPostionToPrevisualizeTetrimino,
} = require("./Tetriminos.utils");
const { pushToHighscores } = require("./Global.utils");
const Piece = require("../models/Piece.models");

function isValidMove(move) {
  const validMoves = [
    "ArrowUp",
    "ArrowDown",
    "ArrowRight",
    "ArrowLeft",
    "Space",
  ];
  return validMoves.includes(move);
}

function handleRotatePiece(ctx) {
  const position = ctx.player.position;
  const tetrimino = new Piece(ctx.player.tetrimino);
  const rotatedTetrimino = tetrimino.rotateTetrimino();

  const emptyPiece = Array.from(Array(rotatedTetrimino.length), () =>
    new Array(10).fill(0)
  );
  let newGameboard = [...emptyPiece].concat([...ctx.player.gameboard]);

  const isCollided = checkTetriminoCollision(
    newGameboard,
    rotatedTetrimino,
    position.x,
    position.y
  );
  if (isCollided) {
    return;
  }

  ctx.player.updateTetrimino(rotatedTetrimino);

  // Clear tetrimino position
  rotatedTetrimino.forEach((row, rowIndex) => {
    row.forEach((_cell, cellIndex) => {
      const offsetX = position.x + cellIndex;
      const offsetY = position.y + rowIndex;
      const inBoardLimits =
        offsetY >= 0 &&
        offsetY < 20 + rotatedTetrimino.length &&
        offsetX >= 0 &&
        offsetX < 10;

      if (inBoardLimits) {
        const gameboardCell = newGameboard[offsetY][offsetX];
        const isFixedCell =
          typeof gameboardCell === "string" && gameboardCell.includes("_fixed");
        if (!isFixedCell) {
          newGameboard[offsetY][offsetX] = 0;
        }
      }
    });
  });

  const positionY = findPostionToPrevisualizeTetrimino(
    newGameboard,
    rotatedTetrimino,
    position.x,
    position.y
  );

  // Clean the old clonedTetrimino in the gameboard
  newGameboard.forEach((row, rowIndex) => {
    row.forEach((_cell, cellIndex) => {
      const gameboardCell = newGameboard?.[rowIndex]?.[cellIndex];
      const isLocation =
        typeof gameboardCell === "string" &&
        gameboardCell.includes("_location");
      if (gameboardCell && isLocation) {
        newGameboard[rowIndex][cellIndex] = 0;
      }
    });
  });

  // And add the new location
  rotatedTetrimino.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const offsetX = position.x + cellIndex;
      const offsetY = positionY - 1 + rowIndex;
      if (cell !== 0) {
        newGameboard[offsetY][offsetX] = cell + "_location";
      }
    });
  });

  // Replace tetrimino in new position
  rotatedTetrimino.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const offsetX = position.x + cellIndex;
      const offsetY = position.y + rowIndex;

      if (
        offsetY >= 0 &&
        offsetY < 20 + rotatedTetrimino.length &&
        offsetX >= 0 &&
        offsetX < 10
      ) {
        const gameboardCell = newGameboard[offsetY][offsetX];
        const isFixedCell =
          typeof gameboardCell === "string" && gameboardCell.includes("_fixed");

        if (!isFixedCell) {
          newGameboard[offsetY][offsetX] = cell;
        }
      }
    });
  });
  ctx.player.updatePlayerGameboard(newGameboard.slice(rotatedTetrimino.length));
}

async function handleMoveDown(ctx) {
  const { player } = ctx;
  if (!player) {
    return;
  }

  const position = player.position;
  const tetrimino = player.tetrimino;
  const isPlaced = placeTetrimino(player, 0, 1);
  const { gamemode } = ctx.room;

  if (!isPlaced) {
    return;
  }

  tetrimino.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const offsetX = position.x + cellIndex;
      const offsetY = position.y + rowIndex - tetrimino.length;
      if (cell !== 0 && player.gameboard[offsetY]) {
        player.gameboard[offsetY][offsetX] = cell + "_fixed";
      }
    });
  });

  clearFullLines(ctx);
  player.updatePlayerPosition(4, 0);
  spawnNewTetrimino(ctx);

  const isMultiplayer = ctx.room.players.length > 1;
  let alivePlayers = ctx.room.players.filter((p) => !p.gameover);

  // Default end - piece outside of board
  player.gameboard[0].forEach((cell) => {
    const isOverflow = cell !== 0 && cell.includes("_fixed");
    if (isOverflow && !player.gameover) {
      player.setGameover();
      pushToHighscores(player.username, gamemode, player.score);

      if (alivePlayers.length === 1) {
        ctx.room.in_progress = false;
        ctx.room.setRoomWinner(player);
      }
    }
  });

  if (!ctx.room.players) {
    return;
  }

  alivePlayers = ctx.room.players.filter((p) => !p.gameover);

  // Score limit gamemode
  if (gamemode === "score_limit" && player.score >= 150) {
    // clearRoomInterval(ctx.room)
    ctx.room.setRoomWinner(player);
  }
  // Basic multiplayer ending
  else if (isMultiplayer && alivePlayers.length === 1) {
    // clearRoomInterval(ctx.room)
    ctx.room.setRoomWinner(alivePlayers[0]);
  }
}

function handleMoveLeft(ctx) {
  placeTetrimino(ctx.player, -1, 0);
}

function handleMoveRight(ctx) {
  placeTetrimino(ctx.player, 1, 0);
}

function fixTetrimino(ctx) {
  const position = ctx.player.position;
  const tetrimino = ctx.player.tetrimino;
  const oldPosition = { ...position };

  const emptyPiece = Array.from(Array(tetrimino.length), () =>
    new Array(10).fill(0)
  );
  let newGameboard = [...emptyPiece].concat([...ctx.player.gameboard]);

  const positionY = findPostionToPrevisualizeTetrimino(
    newGameboard,
    tetrimino,
    position.x,
    position.y
  );
  // Update position
  ctx.player.updatePlayerPosition(position.x, positionY - 1);

  handleMoveDown(ctx);

  // Clean the old tetrimino in the gameboard
  tetrimino.forEach((row, rowIndex) => {
    row.forEach((_cell, cellIndex) => {
      const offsetX = oldPosition.x + cellIndex;
      const offsetY = oldPosition.y + rowIndex;
      const gameboardCell = newGameboard?.[offsetY]?.[offsetX];
      const isFixedCell =
        typeof gameboardCell === "string" && gameboardCell.includes("_fixed");
      if (gameboardCell && !isFixedCell) {
        newGameboard[offsetY][offsetX] = 0;
      }
    });
  });
}

async function handleTetriminoMove(ctx, move) {
  if (ctx.player.gameover) {
    return;
  }

  if (isValidMove(move)) {
    ctx.player.updateLastMove(move);
  }

  switch (move) {
    case "ArrowUp":
      handleRotatePiece(ctx);
      break;
    case "ArrowDown":
      await handleMoveDown(ctx);
      break;
    case "ArrowLeft":
      handleMoveLeft(ctx);
      break;
    case "ArrowRight":
      handleMoveRight(ctx);
      break;
    case "Space":
      fixTetrimino(ctx);
      break;

    default:
      // Skip
      break;
  }
}

module.exports = {
  handleTetriminoMove,
  handleMoveDown,
  isValidMove,
  handleRotatePiece,
  fixTetrimino,
};
