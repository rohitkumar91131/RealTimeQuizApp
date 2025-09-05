"use client"
import { useEffect } from "react"
import CreateAQuiz from "./homepage/CreateAQuiz"
import { useSocket } from "./context/SocketContext"
import toast from "react-hot-toast";

function Page() { // <-- Capital P
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      toast.error("Socket not initialized");
      return;
    }

    socket.connect();

    socket.on("connect_error", (err) => {
      toast(err.message);
    });

  }, [socket]);

  return (
    <div className="!mt-[50px] sm:!mt-[64px] grid grid-cols-1 sm:grid-cols-2">
       <CreateAQuiz/>
    </div>
  )
}

export default Page
