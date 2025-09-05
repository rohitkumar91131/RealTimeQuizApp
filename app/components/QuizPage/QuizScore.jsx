"use client";
import { useState } from "react";

function QuizScore() {
  const [scores, setScores] = useState([
    { question: 1, score: 10, timeTaken: "12s" },
    { question: 2, score: 0, timeTaken: "30s" },
    { question: 3, score: 5, timeTaken: "18s" },
  ]);

  return (
    <div className="w-full h-full p-6 border rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Your Performance</h2>
      <div className="grid grid-cols-1 gap-4">
        {scores.map((q, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 border rounded-xl bg-gray-50"
          >
            {/* Left - Question */}
            <span className="font-medium">Question {q.question}</span>

            {/* Right - Score + Time */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-700">Score: {q.score}</span>
              <span className="text-sm text-gray-500">
                Time: {q.timeTaken}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizScore;
