const utils = require('../src/server/utils/Tetriminos.utils')

test('check tetriminos list', () => {
  expect(utils.tetriminos).toBeDefined()
  expect(utils.tetriminos['i']).toBeDefined()
  expect(utils.tetriminos['j']).toBeDefined()
  expect(utils.tetriminos['l']).toBeDefined()
  expect(utils.tetriminos['o']).toBeDefined()
  expect(utils.tetriminos['s']).toBeDefined()
  expect(utils.tetriminos['t']).toBeDefined()
  expect(utils.tetriminos['z']).toBeDefined()
})

test('get random tetrimino', () => {
  expect(utils.getRandomTetrimino).toBeDefined()

  const randomTetrimino = utils.getRandomTetrimino()
  expect(typeof randomTetrimino === 'object' && Array.isArray(randomTetrimino)).toBeTruthy()
  expect(randomTetrimino.length >= 2 && randomTetrimino.length <= 4).toBeTruthy()

  const randomTetriminos = utils.getRandomTetrimino(2)
  randomTetriminos.forEach((tetrimino) => {
    expect(typeof tetrimino === 'object' && Array.isArray(tetrimino)).toBeTruthy()
    expect(tetrimino.length >= 2 && tetrimino.length <= 4).toBeTruthy()
  })
})

test('rotate a tetrimino', () => {
  expect(utils.rotateTetrimino).toBeDefined()

  const tetrimino = [
    [0, "t", 0],
    [0, "t", "t"],
    [0, "t", 0],
  ]

  const rotatedTetrimino = [
    [0, "t", 0],
    ["t", "t", "t"],
    [0, 0, 0],
  ]

  expect(utils.rotateTetrimino(tetrimino)).toEqual(rotatedTetrimino)
})