"use client"
import { useEffect } from "react"
import CreateAQuiz from "./homepage/CreateAQuiz"
import { useSocket } from "./context/SocketContext"
import toast from "react-hot-toast";
import AllQuizzes from "./homepage/ShowAllQuiz";

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
    <div className=" grid grid-cols-1 sm:grid-cols-2  overflow-hidden ">
       <CreateAQuiz/>
       <AllQuizzes/>
    </div>
  )
}

export default Page
