import React from "react";

interface QuizHeaderProps {
  quizType: string;
  question: string;
}

const QuizHeader = ({ quizType, question }: QuizHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">
          {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz
        </h2>
      </div>
      <p className="text-lg mb-4">{question}</p>
    </>
  );
};

export default QuizHeader;