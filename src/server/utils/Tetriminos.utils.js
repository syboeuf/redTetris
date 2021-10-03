const { getGameboardIndestructibleLines } = require('./Game.utils')

const tetriminos = {
  i: [
    [0, "i", 0, 0],
    [0, "i", 0, 0],
    [0, "i", 0, 0],
    [0, "i", 0, 0],
  ],
  j: [
    [0, "j", 0],
    [0, "j", 0],
    ["j", "j", 0],
  ],
  l: [
    [0, "l", 0],
    [0, "l", 0],
    [0, "l", "l"],
  ],
  o: [
    ["o", "o"],
    ["o", "o"],
  ],
  s: [
    [0, "s", "s"],
    ["s", "s", 0],
    [0, 0, 0],
  ],
  t: [
    [0, "t", 0],
    [0, "t", "t"],
    [0, "t", 0],
  ],
  z: [
    ["z", "z", 0],
    [0, "z", "z"],
    [0, 0, 0],
  ]
}

function getRandomTetrimino(number) {
  const tetriminoIds = "ijlostz"

  if (!number) {
    const randomTetriminoId = tetriminoIds[Math.floor(Math.random() * tetriminoIds.length)]
    return tetriminos[randomTetriminoId]
  }

  let randomTetriminos = []
  for (let i = 0; i < number; i++) {
    const randomTetriminoId = tetriminoIds[Math.floor(Math.random() * tetriminoIds.length)]
    randomTetriminos.push(tetriminos[randomTetriminoId])
  }

  return randomTetriminos
}

function rotateTetrimino(tetrimino) {
  const rotatedTetrimino = tetrimino.map((_, index) =>
    tetrimino.map((col) => col[index]))

  // return rotateTetro.map((row) => row.reverse())

  return rotatedTetrimino.reverse()
}

function placeTetrimino(player, x, y) {
  const position = player.position
  const tetrimino = player.tetrimino

  if (!tetrimino || !position) {
    return
  }
  // Create a empty array to the length of tetrimino
  const emptyPiece = Array.from(Array(tetrimino.length), () => new Array(10).fill(0))
  let newGameboard = [...emptyPiece].concat([...player.gameboard])

  const isCollided = checkTetriminoCollision(newGameboard, tetrimino, position.x + x, position.y + y)

  if (!isCollided) {
    const positionY = findPostionToPrevisualizeTetrimino(newGameboard, tetrimino, position.x + x, position.y)

    // Clean the old clonedTetrimino in the gameboard
    newGameboard.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const gameboardCell = newGameboard?.[rowIndex]?.[cellIndex]
        const isLocation = typeof gameboardCell === 'string' && gameboardCell.includes('_location')
        if (gameboardCell && isLocation) {
          newGameboard[rowIndex][cellIndex] = 0
        }
      })
    })

    // And add the new location
    tetrimino.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const offsetX = position.x + x + cellIndex
        const offsetY = positionY - 1 + rowIndex
        if (cell !== 0) {
          newGameboard[offsetY][offsetX] = cell + "_location"
        }
      })
    })

    // Clear tetrimino position
    tetrimino.forEach((row, rowIndex) => {
      row.forEach((_cell, cellIndex) => {
        const offsetX = position.x + cellIndex
        const offsetY = position.y + rowIndex

        const gameboardCell = newGameboard?.[offsetY]?.[offsetX]
        const isFixed = typeof gameboardCell === 'string' && gameboardCell.includes('_fixed')
        if (gameboardCell && !isFixed) {
          newGameboard[offsetY][offsetX] = 0
        }
      })
    })

    // Set tetrimino in the gameboard
    tetrimino.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const offsetX = position.x + x + cellIndex
        const offsetY = position.y + y + rowIndex
        if (cell !== 0) {
          newGameboard[offsetY][offsetX] = cell
        }
      })
    })

    // Update position
    player.updatePlayerPosition(position.x + x, position.y + y)

    // Update gameboard and remove added columns
    player.updatePlayerGameboard(newGameboard.slice(tetrimino.length))

    return false
  } else {
    return true
  }
}

function findPostionToPrevisualizeTetrimino(newGameboard, tetrimino, x, y) {
  let positionY = y
  while (!checkTetriminoCollision(newGameboard, tetrimino, x, positionY)) {
    positionY++
  }
  return positionY
}

function checkTetriminoCollision(gameboard, tetromino, positionX, positionY) {
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      if (tetromino[y][x] !== 0) {
        const offsetX = positionX + x
        const offsetY = positionY + y
        const gameboardCell = gameboard?.[offsetY]?.[offsetX]
        if (
          gameboardCell === undefined ||
          (typeof gameboardCell === 'string' && gameboardCell.includes('_fixed'))
        ) {
          return true
        }
      }
    }
  }
  return false
}

function spawnNewTetrimino(ctx) {
  ctx.player.updatePlayerTetriminoIndex()

  if (!ctx.room.tetriminos[ctx.player.tetriminoIndex + 1]) {
    const newTetriminos = [
      ...ctx.room.tetriminos,
      ...getRandomTetrimino(500)
    ]
    ctx.room.setTetriminos(newTetriminos)
  }

  ctx.player.setTetrimino(ctx.room.tetriminos[ctx.player.tetriminoIndex])
  ctx.player.setNextTetrimino(ctx.room.tetriminos[ctx.player.tetriminoIndex + 1])
}

function clearFullLines(ctx) {
  let fullLinesCount = 0
  const scoreByLine = 10

  const clearedGameboard = ctx.player.gameboard.reduce((accumulator, row) => {
    const isFullLine = row.find(cell => cell === 0) !== 0 ? true : false
    const isIndestructibleLine = row.find(cell => cell === "a_fixed")
    if (isFullLine && !isIndestructibleLine) {
      fullLinesCount++

      const emptyLine = new Array(10).fill(0)
      accumulator.unshift(emptyLine)
      return accumulator
    }

    accumulator.push(row)
    return accumulator
  }, [])

  /**
   * Rule: if a party is in multiplayer mode and one player clean
   * rows, the opponents should get n-1 indestructible lines
   */
  if (fullLinesCount > 1 && ctx.room.players.length > 1) {
    ctx.player.updatePlayersIndestructibleLines(
      ctx.player.username,
      ctx.room.players,
      fullLinesCount - 1
    )
  }

  const updatedGameboard = getGameboardIndestructibleLines(clearedGameboard, ctx.player.indestructibleLines)

  ctx.player.resetPlayerIndestructibleLines()
  ctx.player.increasePlayerLines(fullLinesCount)
  ctx.player.increasePlayerScore(fullLinesCount * scoreByLine)
  ctx.player.updatePlayerLevel(ctx.room.gamemode)
  ctx.player.updatePlayerGameboard(updatedGameboard)
}

module.exports = {
  tetriminos,
  getRandomTetrimino,
  rotateTetrimino,
  placeTetrimino,
  checkTetriminoCollision,
  spawnNewTetrimino,
  clearFullLines,
  findPostionToPrevisualizeTetrimino
}