"use client";
import { useEffect, useState } from "react";

function QuizQuestionTab() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [question, setQuestion] = useState("What is the capital of France?");
  const [options, setOptions] = useState([
    "Paris",
    "Berlin",
    "Madrid",
    "Rome",
  ]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState(
    "Paris is the capital of France. It is known for its culture, history, and landmarks like the Eiffel Tower."
  );

  useEffect(() => {
    if (submitted) return;
    if (timeLeft === 0) {
      setSubmitted(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-6 relative border rounded-2xl shadow-md">
      
      {/* Timer */}
      <div className="absolute top-4 right-6 text-red-600 font-semibold text-lg">
        {timeLeft}s
      </div>

      {/* Question */}
      <h2 className="text-base md:text-lg font-semibold text-center mb-8 max-w-3xl">
        {question}
      </h2>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-lg mb-6">
        {options.map((opt, i) => {
          const isCorrect = i === correctAnswer;
          const isSelected = i === selected;

          let classes =
            "w-full py-3 px-4 text-left border rounded-xl transition";
          if (isSelected) classes += " bg-blue-500 text-white";
          else classes += " hover:bg-gray-100";

          if (submitted && isCorrect) {
            classes =
              "w-full py-3 px-4 text-left border rounded-xl bg-green-500 text-white";
          }
          if (submitted && isSelected && !isCorrect) {
            classes =
              "w-full py-3 px-4 text-left border rounded-xl bg-red-500 text-white";
          }

          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={classes}
              disabled={submitted}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
          disabled={selected === null}
        >
          Submit
        </button>
      )}

      {/* Explanation */}
      {submitted && (
        <div className="mt-6 p-4 border rounded-xl bg-gray-50 text-sm text-gray-700 max-w-lg">
          <span className="font-semibold">Explanation:</span> {explanation}
        </div>
      )}
    </div>
  );
}

export default QuizQuestionTab;
