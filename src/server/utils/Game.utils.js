function isValidGamemode(gamemode) {
  const validGamemodes = ['normal', 'speed_increase', 'score_limit', 'indestructible_lines']
  return validGamemodes.includes(gamemode)
}

function getGameboardIndestructibleLines(gameboard, lines) {
  let newGameboard = [...gameboard].slice(lines)
  for (let i = 0; i < lines; i++) {
    newGameboard.push(new Array(10).fill('a_fixed'))
  }
  return newGameboard
}

module.exports = { isValidGamemode, getGameboardIndestructibleLines }