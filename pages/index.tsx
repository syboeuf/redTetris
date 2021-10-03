import { SocketContext } from "@contexts/Socket/Socket.context";
import { UserContext } from "@contexts/User/User.context";
import { useRouter } from "next/router";
import Lobby from "@pages/Lobby/Lobby.page";
import Room from "@pages/Room/Room.page";
import NotFound from "./404";
import { useContext, useEffect, useState } from "react";
import { RoomData } from "@customTypes/Global.types";
import { getApi } from "@utils/Api.utils";
import { listRooms } from "@utils/Socket.utils";

const _Room = ({ roomId, username }: { roomId: string, username: string }) => {
  const router = useRouter();
  const { socket, dispatch } = useContext(SocketContext);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [roomNotFound, setRoomNotFound] = useState(false);

  const onRoomData = (data: RoomData) => {
    setRoomData(data);
  }

  const onRoomNotFound = () => {
    setRoomNotFound(true);
  }

  useEffect(() => {
    if (socket) {
      // getRoom(socket, roomId as string);
      dispatch({ type: "get_room", roomId });
      socket.on("room_data", onRoomData).on("room_not_found", onRoomNotFound);
    }

    return () => {
      if (socket) {
        socket.off("room_data").off("room_not_found");
      }
    };
  }, [router, socket]);

  useEffect(() => {
    if (username && username.trim() !== "" && socket) {
      dispatch({ type: "join", roomId, username });
      // joinRoom(socket, roomId, username);
    }

    return () => {
      if (socket) {
        dispatch({ type: "leave", roomId, username });
        // leaveRoom(socket, roomId, username);
      }
    };
  }, [username, socket]);

  if (roomNotFound) {
    return <NotFound />;
  }

  if (!roomData) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <svg
          className="animate-spin h-20 w-20 rounded-full bg-transparent border-2 border-transparent border-opacity-50"
          style={{ borderRightColor: "white", borderTopColor: "white" }}
          viewBox="0 0 24 24"
        />
      </div>
    );
  }

  return <Room room={roomData} />;
};

const _Lobby = () => {
  const { socket, dispatch } = useContext(SocketContext);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [highscores, setHighscores] = useState([])

  useEffect(() => {
    async function initHighscores() {
      const API = getApi()
      const { data } = await API.get('/highscores')
      setHighscores(JSON.parse(data))
    }

    initHighscores()

    if (socket) {
      dispatch({ type: "rooms" });
      listRooms(socket);

      socket.on("rooms", (data: RoomData[]) => {
        setRooms(data);
      });
    }

    return () => {
      if (socket) {
        socket.off("rooms")
      }
    }
  }, [])

  return <Lobby rooms={rooms} highscores={highscores} />;
};

export default function Home() {
  const router = useRouter()
  const hashes = router.asPath.match(/#([a-z0-9-]+)/gi)
  const roomId = hashes?.[0].replace('#', '')
  const { username } = useContext(UserContext);
  const usernameUrl = router.asPath.match(/\[.*?\]/gi)?.[0]
    .replace('[', '')
    .replace(']', '')

    useEffect(() => {
      if (window && roomId && username && usernameUrl && (username !== usernameUrl)) {
        window.location.href = "/"
      }
    },[roomId, username, usernameUrl])

  return roomId
    ? <_Room roomId={roomId} username={username} />
    : <_Lobby />
}