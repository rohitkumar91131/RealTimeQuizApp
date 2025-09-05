"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { Radio, Clock, CheckCircle } from "lucide-react";

const statusIcons = {
  live: <Radio className="text-red-500" />,
  upcoming: <Clock className="text-yellow-500" />,
  ended: <CheckCircle className="text-gray-500" />,
};

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit("get_all_quizzes");

    socket.on("all_quizzes", (data) => {
      setQuizzes(data);
      setLoading(false);
    });

    socket.on("quiz_error", (msg) => {
      console.error(msg);
      setLoading(false);
    });

    socket.on("private_quiz", (res) => {
      setQuizzes(prev => [res, ...prev]);
    });

    socket.on("public_quiz", (res) => {
      setQuizzes(prev => [res, ...prev]);
    });

    return () => {
      socket.off("all_quizzes");
      socket.off("quiz_error");
      socket.off("private_quiz");
      socket.off("public_quiz");
    };
  }, [socket]);

  if (loading) return <p>Loading quizzes...</p>;
  if (quizzes.length === 0) return <p>No quizzes available.</p>;

  return (
    <div className="!mt-[10dvh] h-[90dvh] overflow-y-auto border-gray-300">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Host</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => {
            // Normalize status for icon mapping
            let statusKey = quiz.status.toLowerCase();
            if (statusKey === "stopped") statusKey = "ended";

            return (
              <tr key={quiz.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{quiz.quiz_name}</td>
                <td className="border border-gray-300 px-4 py-2">{quiz.host?.name || "Unknown"}</td>
                <td className="border border-gray-300 px-4 py-2 flex items-center gap-1">
                  {statusIcons[statusKey] || null}
                  <span className="capitalize">{quiz.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
