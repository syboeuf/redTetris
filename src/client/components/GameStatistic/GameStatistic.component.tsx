import classNames from 'classnames'
import styles from './GameStatistic.module.css'

interface GameStatisticProps {
  label: string
  value: string
  className?: string
}

export default function GameStatistic({ label, value, className }: GameStatisticProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <span className={styles.label}>{label}</span> {value}
    </div>
  )
}

GameStatistic.displayName = 'GameStatistic'