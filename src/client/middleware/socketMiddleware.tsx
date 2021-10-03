import { GamemodeType } from "@customTypes/Global.types";

function play(socket: any, roomId: string, username: string, move: string) {
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

function createRoom(socket: any, username: string) {
  socket.emit("create", { username });
}

function joinRoom(socket: any, roomId: string, username: string) {
  socket.emit("join", { roomId, username });
}

function updateGamemode(
  socket: any,
  roomId: string,
  username: string,
  gamemode: GamemodeType
) {
  socket.emit("update_room", { roomId, username, gamemode });
}

function listRooms(socket: any) {
  socket.emit("rooms");
}

function getRoom(socket: any, roomId: string) {
  socket.emit("get_room", { roomId });
}

function startRoom(socket: any, roomId: string, username: string) {
  socket.emit("start", { roomId, username });
}

function restartRoom(socket: any, roomId: string, username: string) {
  socket.emit("restart", { roomId, username });
}

function leaveRoom(socket: any, roomId: string, username: string) {
  socket.emit("leave", { roomId, username });
}

const socketMiddleware = (state: any, dispatchMiddleware: any) =>  {
  return (socket: any) => (action: any) => (next: any) => {
    switch (action.type) {
      case "play":
        play(socket, action.roomId, action.username, action.move);
        break;
  
      case "create":
        createRoom(socket, action.username);
        break;
  
      case "join":
        joinRoom(socket, action.roomId, action.username);
        break;
  
      case "update_room":
        updateGamemode(socket, action.roomId, action.username, action.gamemode);
        break;
  
      case "rooms":
        listRooms(socket);
        break;
  
      case "get_room":
        getRoom(socket, action.roomId);
        break;
  
      case "start":
        startRoom(socket, action.roomId, action.username);
        break;
  
      case "restart":
        restartRoom(socket, action.roomId, action.username);
        break;
  
      case "leave":
        leaveRoom(socket, action.roomId, action.username);
        break;
  
      default:
        break;
    }
    // return next(action)
  }
};

export { socketMiddleware };
