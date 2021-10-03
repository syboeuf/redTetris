import { Highscore, RoomData } from '@customTypes/Global.types'

export function sortRoomsByStatus(rooms: RoomData[]) {
  return rooms.sort((r1, r2) => Number(r1.in_progress) - Number(r2.in_progress))
}

export function sortHighscoresByScore(highscores: Highscore[]) {
  return highscores.sort((hs1, hs2) => hs2.score - hs1.score)
}