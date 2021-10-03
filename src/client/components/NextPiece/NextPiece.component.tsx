import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { TetriminoPiece } from '@customTypes/Tetriminos.types'
import { getCellVariantClassname } from '@utils/Gameboard.utils'
import styles from './NextPiece.module.css'

interface NextPieceProps {
  piece: Array<Array<string | number>>
}

export default function NextPiece({ piece }: NextPieceProps) {
  const [grid, setGrid] = useState(Array.from(Array(4), () => new Array(5).fill(0)))

  const updateGrid = useCallback(() => {
    let gridToFill = Array.from(Array(4), () => new Array(5).fill(0))

    {gridToFill.map((row, rowIndex) => {
      row.map((_cell, cellIndex) => {
        if (piece?.[rowIndex]?.[cellIndex] && typeof piece[rowIndex][cellIndex] === 'string') {
          gridToFill[rowIndex][cellIndex + 1] = piece[rowIndex][cellIndex]
        }
      })
    })}

    setGrid(gridToFill)
  }, [piece])

  useEffect(() => {
    updateGrid()
  }, [piece])

  return (
    <div className={styles.nextPiece}>
      {grid.map((row, rowIndex) => (
        <div className={styles.nextPiece_row} key={`next-piece-row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <div
              key={`next-piece-cell-${rowIndex}-${cellIndex}`}
              className={classNames(styles.nextPiece_cell, getCellVariantClassname(cell))}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

NextPiece.displayName = 'NextPiece'