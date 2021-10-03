import classNames from 'classnames'
import Avatar from '@components/Avatar/Avatar.component'
import Link from 'next/link'
import { RoomData } from '@customTypes/Global.types'
import styles from './RoomCard.module.css'

export interface RoomCardProps {
  room: RoomData
  username: string
}

export default function RoomCard({ room, username }: RoomCardProps) {
  const { id, owner, players, gamemode, in_progress } = room

  return (
    <div className={classNames(styles.roomCard, {
      [styles.roomCard__inProgress]: in_progress
    })}>
      <Link href={`#${id}[${username}]`}>
        <a>
          <div className={styles.overlay}>
            <div className={styles.overlay_container}>
              <span className={styles.overlay_text}>
                {in_progress ? 'Regarder' : 'Rejoindre'}
              </span>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.title}>Salon de {owner}</div>
              {players && (
                <ul className={styles.avatars}>
                  {players.map(({ username, avatarColor }) => (
                    <li key={`player-${username}`}>
                      <Avatar
                        username={username}
                        color={avatarColor}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.gamemode}>Mode de jeu: {gamemode}</div>
          </div>
        </a>
      </Link>
    </div>
  )
}