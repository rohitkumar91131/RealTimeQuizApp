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

  useEffect(()=>{
    (async()=>{
      let res = await fetch("http://localhost:4000");
      let data = await res.json();
      toast(data.msg)
    })()
  },[])

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2  overflow-y-auto ">
       <CreateAQuiz/>
       <AllQuizzes/>
    </div>
  )
}

export default Page
