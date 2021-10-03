import { TetriminoId } from "@customTypes/Tetriminos.types"

export const Tetriminos = {
  'I': [
    [0, "I", 0, 0],
    [0, "I", 0, 0],
    [0, "I", 0, 0],
    [0, "I", 0, 0]
  ],
  'J': [
    [0, "J", 0],
    [0, "J", 0],
    ["J", "J", 0]
  ],
  'L': [
    [0, "L", 0],
    [0, "L", 0],
    [0, "L", "L"]
  ],
  'O': [
    ["O", "O"],
    ["O", "O"]
  ],
  'S': [
    [0, "S", "S"],
    ["S", "S", 0],
    [0, 0, 0]
  ],
  'T': [
    [0, "T", 0],
    [0, "T", "T"],
    [0, "T", 0]
  ],
  'Z': [
    ["Z", "Z", 0],
    [0, "Z", "Z"],
    [0, 0, 0]
  ],
  'A': [
    ["A", "A", "A"]
  ]
}

export function getRandomTetrimino() {
  const tetriminos = 'IJLOSTZ'
  const randomTetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)] as TetriminoId

  return Tetriminos[randomTetrimino]
};
