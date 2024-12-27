import React from "react";
import QuizButton from "./QuizButton";

interface QuizOptionsProps {
  options: string[];
  selectedAnswer: string | null;
  correctDefinition: string;
  onSelectAnswer: (answer: string) => void;
}

const QuizOptions = ({ 
  options, 
  selectedAnswer, 
  correctDefinition, 
  onSelectAnswer 
}: QuizOptionsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {options.map((option, index) => (
        <QuizButton
          key={index}
          option={option}
          onClick={() => onSelectAnswer(option)}
          disabled={selectedAnswer !== null}
          isCorrect={selectedAnswer === option ? option === correctDefinition : null}
          isSelected={selectedAnswer === option}
        />
      ))}
    </div>
  );
};

export default QuizOptions;