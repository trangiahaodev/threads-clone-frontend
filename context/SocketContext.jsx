import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../src/atoms/userAtom";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useRecoilValue(userAtom);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    // eslint-disable-next-line no-undef
    const socket = io(process.env.BACKEND_URL, {
      query: {
        userId: user?._id,
      },
      transports: ["websocket"],
    });

    setSocket(socket);

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket && socket.disconnect();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
