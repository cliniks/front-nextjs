import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { getUserToken } from "@core/utils/token";
import { useUser } from "@core/hooks/contexstHooks";

const userToken = getUserToken();

const ioConnection = () =>
  io(process.env.NEXT_PUBLIC_HOST, {
    // io("http://localhost:3010", {
    transports: ["polling", "websocket"],
    auth: (cb) => {
      cb({
        "x-access-token": userToken,
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ECOMMERSYS_APP_TOKEN}`,
      });
    },
  });

export const WebsocketProvider = ({ children }: React.PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket>(null);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const { user } = useUser();

  const connectSocket = () => {
    setSocket(ioConnection());
  };

  const listenMyUserChat = () => {
    socket.emit("listenMyUserChat");
  };
  const listenMyStoreChat = () => {
    socket.emit("listenMyStoreChat");
  };

  const connectRoom = (roomId: string) => {
    socket.emit("listenRoom", { roomId });
  };

  const sendUserMessage = (data: {
    roomId: string;
    type: "text" | "image" | "document";
    body: string;
  }) => {
    socket.emit("sendUserMessage", data);
  };
  const sendStoreMessage = (data: {
    roomId: string;
    type: "text" | "image" | "document";
    body: string;
  }) => {
    socket.emit("sendStoreMessage", data);
  };

  useEffect(() => {
    if (user) connectSocket();
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connect");
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });

      socket.on(`myChat/${user._id}`, (chat) => {
        setChat(chat);
      });

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("myChat");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (roomId && socket) {
      socket.on(`room/${roomId}`, (room) => {
        setMessages(room);
      });
      return () => {
        socket.off(`room/${roomId}`);
      };
    }
  }, [socket, roomId]);

  const values = {
    listenMyUserChat,
    listenMyStoreChat,
    connectRoom,
    sendUserMessage,
    sendStoreMessage,
    chat,
    messages,
    setRoomId,
    roomId,
    socket,
  };
  return (
    <WebsocketContext.Provider value={values}>
      {children}
    </WebsocketContext.Provider>
  );
};

type valuesType = {
  listenMyUserChat: () => void;
  listenMyStoreChat: () => void;
  connectRoom: (roomId: string) => void;
  sendUserMessage: (data: {
    roomId: string;
    type: "text" | "image" | "document";
    body: string;
  }) => void;
  sendStoreMessage: (data: {
    roomId: string;
    type: "text" | "image" | "document";
    body: string;
  }) => void;
  chat: any;
  messages: any;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  socket: Socket | null;
};

const initialValues = {
  listenMyUserChat: () => null,
  listenMyStoreChat: () => null,
  connectRoom: () => null,
  sendUserMessage: () => null,
  sendStoreMessage: () => null,
  chat: null,
  messages: null,
  setRoomId: () => null,
  roomId: "",
  socket: null,
};

const WebsocketContext = createContext<valuesType>(initialValues);

export type MessageType = {
  _id: string;
  sender: string;
  type: "text" | "image" | "document";
  body: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

export const useWebsocket = () =>
  WebsocketContext && useContext(WebsocketContext);
