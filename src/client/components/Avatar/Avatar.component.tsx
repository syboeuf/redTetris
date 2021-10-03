import ViewIcon from '@icons/View.icon'
import styles from './Avatar.module.css'
import { getFirstCharacter } from "./Avatar.utils"

export interface AvatarProps {
  username: string
  color?: string
  spectator?: boolean
}

export default function Avatar({ username, color = '#FFF', spectator }: AvatarProps) {
  const letter = getFirstCharacter(username)

  return (
    <div
      className={styles.avatar}
      style={{ background: color }}
    >
      {spectator && (
        <ViewIcon className={styles.spectatorIcon} />
      )}
      <span>{letter}</span>
    </div>
  )
}