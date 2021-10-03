const utils = require('../src/server/utils/Global.utils')
const fs = require('fs')

test('get random avatar color', () => {
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

  expect(utils.getRandomAvatarColor).toBeDefined()
  expect(avatarsColorPalette.includes(utils.getRandomAvatarColor())).toBeTruthy()
})

test('update highscores', () => {
  expect(utils.pushToHighscores).toBeDefined()

  const fileName = 'src/server/database/highscores.json'
  let highscores, player

  fs.writeFileSync(fileName, '[]')

  // First test (first highscore)
  utils.pushToHighscores('unit_test_player', 'test_mode', 2882)

  highscores = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  player = highscores.find(p => p.username === 'unit_test_player')
 
  expect(player).toBeDefined()
  expect(player).toEqual({ username: 'unit_test_player', gamemode: 'test_mode', score: 2882 })

  // Second test (new lower highscore)
  utils.pushToHighscores('unit_test_player', 'test_mode', 1931)

  highscores = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  player = highscores.find(p => p.username === 'unit_test_player')
 
  expect(player).toBeDefined()
  expect(player).toEqual({ username: 'unit_test_player', gamemode: 'test_mode', score: 2882 })

  // Third test (new higher highscore)
  utils.pushToHighscores('unit_test_player', 'test_mode', 4522)

  highscores = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  player = highscores.find(p => p.username === 'unit_test_player')
 
  expect(player).toBeDefined()
  expect(player).toEqual({ username: 'unit_test_player', gamemode: 'test_mode', score: 4522 })
})

test('sleep', async () => {
  expect(utils.sleep).toBeDefined()
  const timestamp = Date.now()
  await utils.sleep(300)
  expect(Date.now() - timestamp).toBeGreaterThan(290)
})
