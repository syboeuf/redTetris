import { GamemodeType, RoomData } from "@customTypes/Global.types";
import Select from "react-select";
import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "@contexts/Socket/Socket.context";
import { updateGamemode } from "@utils/Socket.utils";
import { UserContext } from "@contexts/User/User.context";
import { gamemodeLabels } from "@utils/Gamemode.utils";

interface GamemodeSelectorProps {
  room: RoomData;
  className?: string;
}

export default function GamemodeSelector({
  room,
  className,
}: GamemodeSelectorProps) {
  const { socket, dispatch } = useContext(SocketContext);
  const { username } = useContext(UserContext);
  const options = [
    { value: "normal", label: gamemodeLabels["normal"] },
    { value: "speed_increase", label: gamemodeLabels["speed_increase"] },
    { value: "score_limit", label: gamemodeLabels["score_limit"] },
    {
      value: "indestructible_lines",
      label: gamemodeLabels["indestructible_lines"],
    },
  ];

  const isOwner = username === room.owner;
  const inProgress = room.in_progress;

  const onGamemodeChange = useCallback(
    (gamemode: GamemodeType) => {
      if (gamemode) {
        dispatch({ type: "update_room", roomId: room.id, username, gamemode });
        // updateGamemode(socket, room.id, username, gamemode)
      }
    },
    [room, username]
  );

  useEffect(() => {
    room.gamemode;
  }, [room]);

  return (
    <Select
      value={options.find((option) => option.value === room.gamemode)}
      options={options}
      onChange={(option) =>
        onGamemodeChange((option?.value as GamemodeType) || "normal")
      }
      className={className}
      isDisabled={!isOwner || inProgress}
    />
  );
}

GamemodeSelector.displayName = "GamemodeSelector";
