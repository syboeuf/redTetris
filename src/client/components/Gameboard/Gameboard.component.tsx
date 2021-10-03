import styles from './Gameboard.module.css'
import { getCellVariantClassname } from '@utils/Gameboard.utils'

export interface GameboardProps {
  gameboard: Array<Array<string | number>>
}

export default function Gameboard({ gameboard }: GameboardProps) {
  return (
    <div className={styles.gameboard}>
      {gameboard.length === 20 ? (
        gameboard.map((row, rowNumber) => (
          row.map((cell, cellNumber) => (
            <div
              className={getCellVariantClassname(cell)}
              key={`main-gboard-${rowNumber}-${cellNumber}`}
            />
          ))
        ))
      ) : (
        Array.from(Array(20), () => new Array(10).fill(0))
          .map((row, rowNumber) => (
            row.map((cell, cellNumber) => (
              <div
                className={getCellVariantClassname(cell)}
                key={`main-gboard-${rowNumber}-${cellNumber}`}
              />
            ))
          ))
      )}
    </div>
  )
}