import Gameboard from "@components/Gameboard/Gameboard.component";
import GameboardSpectre from "@components/Gameboard/GameboardSpectre/GameboardSpectre.component";
import styles from "./RoomMobile.module.css";
import { RoomData } from "@customTypes/Global.types";
import { useContext } from "react";
import { UserContext } from "@contexts/User/User.context";
import { play } from "@utils/Socket.utils";
import { SocketContext } from "@contexts/Socket/Socket.context";
import GameStatistic from "@components/GameStatistic/GameStatistic.component";

interface RoomMobileProps {
  room: RoomData;
}

export default function RoomMobile({ room }: RoomMobileProps) {
  const { socket, dispatch } = useContext(SocketContext);
  const { username } = useContext(UserContext);
  const isSpectator = room.spectators.find((p) => p.username === username)
    ? true
    : false;
  const bestOpponent = room.players.find((p) => p.username !== username);
  const player = isSpectator
    ? bestOpponent
    : room.players.find((p) => p.username === username);
  const mainGameboard = player?.gameboard || [];
  const spectreGameboard = bestOpponent?.gameboard || [];
  const inProgress = room.in_progress;
  const isOwner = username === room.owner;
  const playerScore = player?.score || 0;
  const playerLevel = player?.level || 0;

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isSpectator) {
      return;
    }

    play(socket, room.id, username, event.code);
  }

  return (
    <div tabIndex={0} className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.subcontainer}>
        <div className={styles.leftPane}>
          {bestOpponent && (
            <GameboardSpectre gameboard={spectreGameboard} username={bestOpponent.username} />
          )}
        </div>

        <div className="flex gap-2">
          <GameStatistic label="Points:" value={`${playerScore}`} />
          <GameStatistic label="Niveau:" value={`${playerLevel}`} />
        </div>

        <Gameboard gameboard={mainGameboard} />

        {!inProgress && isOwner && (
          <button
            className={styles.startGame}
            onClick={() =>
              dispatch({ type: "start", roomId: room.id, username })
            }
          >
            <span>Commencer la partie</span>
          </button>
        )}
      </div>
    </div>
  );
}

RoomMobile.displayName = "RoomMobile";
