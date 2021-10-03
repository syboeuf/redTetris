import { createContext, useReducer } from "react";
import { SocketContextValues } from "./Socket.types";
import { io } from "socket.io-client";
import { socketMiddleware } from "../../middleware/socketMiddleware";

export const SocketContext = createContext<SocketContextValues>({
  socket: null,
  dispatch: null,
});

// Reducer ------------------------------------------------------------------
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    default:
      break;
  }
};

// Reducer Middleware
const reducerMiddleware = (reducer: any ) => {
  const socket = io("localhost:4000");
  // Define reducer
  const [state, dispatch] = useReducer(reducer, socket);
  // The middleware function
  const dispatchMiddleWare = (action:any) => {   
    socketMiddleware(state, dispatchMiddleWare)(state)(action)(dispatch)
}; 

  // Instead of dispatch returns "dispatchMiddleware"
  return [state, dispatchMiddleWare];
};

export function SocketProvider({ children }: any) {
  const [socket, dispatch] = reducerMiddleware(reducer);
  return (
    <SocketContext.Provider value={{ socket, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
}

SocketProvider.displayName = "SocketProvider";
SocketContext.displayName = "SocketContext";
