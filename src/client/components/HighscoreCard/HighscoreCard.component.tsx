import { numberWithSpaces } from '@utils/Format.utils'
import { gamemodeLabels } from '@utils/Gamemode.utils'
import classNames from 'classnames'
import styles from './HighscoreCard.module.css'

interface HighscoreCardProps {
  username: string
  gamemode: string
  score: number
  rank: number
}

export default function HighscoreCard({ username, gamemode, score, rank }: HighscoreCardProps) {
  const gamemodeLabel = gamemodeLabels[gamemode]

  return (
    <div className={classNames(styles.highscoreCard, {
      [styles.highscoreCard__gold]: rank === 1,
      [styles.highscoreCard__silver]: rank === 2,
      [styles.highscoreCard__bronze]: rank === 3,
      [styles.highscoreCard__default]: rank > 3,
    })}>
      <div>
        <div className={styles.highscoreCard_username}>{username}</div>
        <div>{numberWithSpaces(score)} points</div>
      </div>
      <div className={styles.highscoreCard_right}>
        <div className={styles.highscoreCard_rank}>
          {rank === 1 ? '1er' : `${rank}ème`} 
        </div>  
        <div>{gamemodeLabel}</div>
      </div>
    </div>
  )
}