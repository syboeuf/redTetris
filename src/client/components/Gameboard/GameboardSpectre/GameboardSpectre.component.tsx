import styles from '../Gameboard.module.css'
import { getSpectrumCellVariantClassname } from '@utils/Gameboard.utils'

export interface GameboardProps {
  gameboard: Array<Array<string | number>>
  username?: string
}

export default function Gameboard({ gameboard, username }: GameboardProps) {
  return (
    <>
      <div className={styles.gameboard}>
        {gameboard.map((row, rowNumber) => (
          row.map((cell, cellNumber) => (
            <div
              className={getSpectrumCellVariantClassname(cell)}
              key={`spectre-gboard-${rowNumber}-${cellNumber}`}
            />
          ))
        ))}
      </div>
      {username && (
        <div className={styles.username}>{username}</div>
      )}
    </>
  )
}