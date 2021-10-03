import classNames from "classnames";
import styles from "./Lobby.module.css";
import { Highscore, RoomData } from "@customTypes/Global.types";
import Username from "@components/Username/Username.component";
import Image from "next/image";
import { sortRoomsByStatus, sortHighscoresByScore } from "@utils/Rooms.utils";
import { numberWithSpaces } from "@utils/Format.utils";
import Button from "@components/Button/Button.component";
import RoomCard from "@components/RoomCard/RoomCard.component";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { SocketContext } from "@contexts/Socket/Socket.context";
import { UserContext } from "@contexts/User/User.context";
import HighscoreCard from "@components/HighscoreCard/HighscoreCard.component";

export interface LobbyProps {
  rooms: RoomData[];
  highscores: Highscore[];
}

export default function Lobby({ rooms, highscores }: LobbyProps) {
  const router = useRouter()
  const { socket, dispatch } = useContext(SocketContext)
  const { username } = useContext(UserContext)
  const sortedRooms = sortRoomsByStatus(rooms)
  const sortedHighscores = sortHighscoresByScore(highscores)
  const roomsExist = sortedRooms.length > 0

  const handleRoomCreate = useCallback(() => {
    if (socket) {
      dispatch({ type: "create", username });
      socket.on("room_created", ({ roomId }: { roomId: string }) => {
        if (roomId) {
          router.push(`#${roomId}[${username}]`);
        }
      });
    }
  }, [username, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.rooms}>
        <div className={styles.rooms_head}>
          <h2 className={styles.title}>Rejoindre une partie</h2>
          <div className={styles.actions}>
            <Username />
            <Button onClick={handleRoomCreate} className="ml-3">
              <span>+</span>
            </Button>
          </div>
        </div>

        <ul className={styles.list}>
          {!roomsExist && (
            <div className={styles.noRooms}>
              <Image src="/arcade.svg" width={500} height={500} />
              <div className={styles.noRooms_text}>
                Il n'y a aucune partie, créez-en une maintenant.
              </div>
            </div>
          )}

          {sortedRooms.map((room, index) => (
            <li key={`room-${index}`}>
              <RoomCard room={room} username={username} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.highscores}>
        <h2 className={styles.title}>Meilleurs scores</h2>
        <ul className={styles.list}>
          {sortedHighscores.map(({ username, score, gamemode }, index) => {
            return (
              <li key={`highscore-${index}`}>
                <HighscoreCard
                  username={username}
                  gamemode={gamemode}
                  rank={index + 1}
                  score={score}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
