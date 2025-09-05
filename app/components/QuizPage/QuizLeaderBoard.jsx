"use client";
import { useState } from "react";

function QuizLeaderBoard() {
  const [allParticipants, setAllParticipants] = useState([
    {
      username: "Rohit",
      profilePhoto: "https://i.pravatar.cc/40?img=1",
      score: 120,
      rank: 1,
    },
    {
      username: "Anita",
      profilePhoto: "https://i.pravatar.cc/40?img=2",
      score: 90,
      rank: 2,
    },
    {
      username: "Vikram",
      profilePhoto: "https://i.pravatar.cc/40?img=3",
      score: 70,
      rank: 3,
    },
  ]);

  return (
    <div className="w-full h-full p-6 border rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
      <div className="grid grid-cols-1 gap-4">
        {allParticipants.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 border rounded-xl bg-gray-50"
          >
            {/* Left - profile */}
            <div className="flex items-center gap-3">
              <img
                src={p.profilePhoto}
                alt={p.username}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{p.username}</span>
            </div>

            {/* Right - score + rank */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-700">Score: {p.score}</span>
              <span className="text-sm font-semibold text-purple-600">
                #{p.rank}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizLeaderBoard;
