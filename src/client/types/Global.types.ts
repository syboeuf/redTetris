export type GamemodeType =
  | 'normal'
  | 'speed_increase'
  | 'score_limit'
  | 'indestructible_lines'

export interface Player {
  username: string
  avatarColor: string
  tetriminoIndex: number
  tetrimino: Array<Array<string | number>>
  nextTetrimino: Array<Array<string | number>>
  level: number
  score: number
  lines: number
  gameboard: Array<Array<string | number>>
  isSpectator: boolean
  gameover: boolean
}

export interface Spectator {
  username: string
  avatarColor: string
  isSpectator: boolean
}

export interface Highscore {
  username: string
  score: number
  gamemode: string
}

export interface RoomData {
  id: string
  owner: string
  gamemode: GamemodeType
  players: Player[]
  spectators: Spectator[]
  in_progress: boolean
  winner: null | string
}