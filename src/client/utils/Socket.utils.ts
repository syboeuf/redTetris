import { GamemodeType } from "@customTypes/Global.types";

export function play(
  socket: any,
  roomId: string,
  username: string,
  move: string
) {
  const authorizedKeyMoves = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space",
  ];
  if (authorizedKeyMoves.includes(move)) {
    socket.emit("play", { roomId, username, move });
  }
}

export function createRoom(socket: any, username: string) {
  socket.emit("create", { username });
}

export function joinRoom(socket: any, roomId: string, username: string) {
  socket.emit("join", { roomId, username });
}

export function updateGamemode(
  socket: any,
  roomId: string,
  username: string,
  gamemode: GamemodeType
) {
  socket.emit("update_room", { roomId, username, gamemode });
}

export function listRooms(socket: any) {
  socket.emit("rooms");
}

export function getRoom(socket: any, roomId: string) {
  socket.emit("get_room", { roomId });
}

export function startRoom(socket: any, roomId: string, username: string) {
  socket.emit("start", { roomId, username });
}

export function restartRoom(socket: any, roomId: string, username: string) {
  socket.emit("restart", { roomId, username });
}

export function leaveRoom(socket: any, roomId: string, username: string) {
  socket.emit("leave", { roomId, username });
}
