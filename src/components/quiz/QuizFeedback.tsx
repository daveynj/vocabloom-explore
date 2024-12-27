import React from "react";
import { Button } from "@/components/ui/button";

interface QuizFeedbackProps {
  feedback: string;
  isCorrect: boolean | null;
  onReset: () => void;
}

const QuizFeedback = ({ feedback, isCorrect, onReset }: QuizFeedbackProps) => {
  if (!feedback) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-gray-700">{feedback}</p>
      {!isCorrect && (
        <Button onClick={onReset} className="mt-4 w-full">
          Try New Question
        </Button>
      )}
    </div>
  );
};

export default QuizFeedback;