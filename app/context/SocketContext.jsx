'use client'
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  if (!socketRef.current) {
    socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      autoConnect: false,
      withCredentials: true,
    });
  }

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected, setConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
