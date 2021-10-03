import { SocketError, SocketInfo } from "@customTypes/Socket.types";
import { SocketContext } from "@contexts/Socket/Socket.context";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";
import classNames from "classnames";

export interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isRoom = router.asPath.includes("#");
  const { socket } = useContext(SocketContext);

  function handleSocketErrors(data: SocketError) {
    toast(data.message, { type: "error" });
  }

  function handleSocketInfos(data: SocketInfo) {
    toast(data.message);
  }

  useEffect(() => {
    if (socket) {
      socket.on("error", handleSocketErrors);
      socket.on("info", handleSocketInfos);
    }
  }, [socket]);

  return (
    <div
      className={classNames(styles.layout, {
        [styles.layout__room]: isRoom,
      })}
    >
      {children}

      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}
