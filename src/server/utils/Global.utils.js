const fs = require('fs')

function createGameboard() {
  return Array.from(Array(20), () => new Array(10).fill(0))
}

function getRandomAvatarColor() {
  const avatarsColorPalette = [
    '#EC459D',
    '#5865F2',
    '#39B7BA',
    '#3AA65B',
    '#89C702',
    '#FAA618',
    '#FB7A08',
    '#EE4244',
    '#EC459D',
    '#A073ED'
  ]

  return avatarsColorPalette[Math.floor(
    Math.random() * avatarsColorPalette.length)]
}

function pushToHighscores(username, gamemode, score) {
  const fileName = 'src/server/database/highscores.json'
  const highscores = JSON.parse(fs.readFileSync(fileName, 'utf-8'))

  let prevHighscore = highscores.find(hs => hs.username === username)
  let prevHighscoreIndex = highscores.findIndex(hs => hs.username === username)

  if (prevHighscore && score > prevHighscore.score) {
    highscores[prevHighscoreIndex].score = score
  } else if (!prevHighscore) {
    highscores.push({ username, gamemode, score })
  }

  const sortedHighscores = highscores.sort(function (a, b) {return a.score - b.score})
  fs.writeFileSync(fileName, JSON.stringify(sortedHighscores.slice(0, 50)))
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  createGameboard,
  getRandomAvatarColor,
  pushToHighscores,
  sleep
}