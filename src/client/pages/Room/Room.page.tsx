import Gameboard from "@components/Gameboard/Gameboard.component";
import GameboardSpectre from "@components/Gameboard/GameboardSpectre/GameboardSpectre.component";
import styles from "./Room.module.css";
import { Player, RoomData, Spectator } from "@customTypes/Global.types";
import { useContext } from "react";
import { UserContext } from "@contexts/User/User.context";
import { SocketContext } from "@contexts/Socket/Socket.context";
import Avatar from "@components/Avatar/Avatar.component";
import classNames from "classnames";
import NextPiece from "@components/NextPiece/NextPiece.component";
import GameStatistic from "@components/GameStatistic/GameStatistic.component";
import useWindowSize from "@hooks/useWindowSize.hook";
import RoomMobile from "./RoomMobile/RoomMobile.component";
import Button from "@components/Button/Button.component";
import GamemodeSelector from "@components/GamemodeSelector/GamemodeSelector.component";
import { defaultEmptyBoard } from "@utils/Gameboard.utils";

interface RoomProps {
  room: RoomData;
}

export default function Room({ room }: RoomProps) {
  const { dispatch } = useContext(SocketContext);
  const { username } = useContext(UserContext);
  const { width } = useWindowSize();
  const isSpectator = room.spectators.find((p) => p.username === username)
    ? true
    : false;
  const bestOpponent = room.players.find((p) => p?.username !== username);
  const player = isSpectator
    ? bestOpponent
    : room.players.find((p) => p?.username === username);
  const mainGameboard = player?.gameboard || defaultEmptyBoard();
  const spectreGameboard = bestOpponent?.gameboard || [];
  const inProgress = room.in_progress;
  const hasWinner = room.winner && room.winner.trim() !== "";
  const isMultiplayer = room.players.length > 1;
  const isEnded = hasWinner;
  const isOwner = username === room.owner;
  const isWinner = room.winner && room.winner === username;
  const gameoverText = isWinner
    ? "Bravo, vous avez gagné ! :)"
    : "Vous avez perdu. :(";
  const playerScore = player?.score || 0;
  const playerLines = player?.lines || 0;
  const playerLevel = player?.level || 0;
  const playersAndSpectators: (Player | Spectator)[] = [
    ...room.players,
    ...room.spectators,
  ];

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isSpectator) {
      return;
    }
    dispatch({ type: "play", roomId: room.id, username, move: event.code });
  }

  if (width < 600) {
    return <RoomMobile room={room} />;
  }

  return (
    <div tabIndex={0} className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.subcontainer}>
        <div className={styles.leftPane}>
          {(bestOpponent && isMultiplayer) && <GameboardSpectre gameboard={spectreGameboard} username={bestOpponent.username} />}
        </div>

        <Gameboard gameboard={mainGameboard} />

        <div className={styles.rightPane}>
          <GameStatistic label="Score:" value={`${playerScore} points`} />
          <GameStatistic label="Lignes:" value={`${playerLines}`} />
          <GameStatistic label="Niveau:" value={`${playerLevel}`} />

          {player?.nextTetrimino && !hasWinner && (
            <NextPiece piece={player.nextTetrimino} />
          )}

          <GamemodeSelector room={room} className="my-5" />
          {isOwner && !inProgress && (
            <div>
              {isEnded ? (
                <Button
                  onClick={() =>
                    dispatch({ type: "restart", roomId: room.id, username })
                  }
                  className="w-full"
                >
                  <span>Recommencer la partie</span>
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    dispatch({ type: "start", roomId: room.id, username })
                  }
                  className="w-full"
                >
                  <span>Commencer la partie</span>
                </Button>
              )}
            </div>
          )}

          {(hasWinner) && (
            <p className="text-white mt-6 mb-4">{gameoverText}</p>
          )}

          <ul className={styles.avatars}>
            {playersAndSpectators.map(
              ({ username, avatarColor, isSpectator }, index) => (
                <li
                  key={`avatar-${username}`}
                  className={classNames("relative", { "ml-3": index > 0 })}
                >
                  <Avatar
                    username={username}
                    color={avatarColor}
                    spectator={isSpectator}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
