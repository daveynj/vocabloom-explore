import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuizProps {
  word: string;
  correctDefinition: string;
  options: string[];
}

const VocabularyQuiz = ({ word, correctDefinition, options }: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === correctDefinition;
    setIsCorrect(correct);
    
    if (correct) {
      toast.success("Correct! Well done!");
    } else {
      toast.error("Incorrect. Try again!");
    }
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) return "bg-white hover:bg-gray-100";
    if (option === correctDefinition) return "bg-success text-success-foreground";
    if (option === selectedAnswer) return "bg-error text-error-foreground";
    return "bg-white hover:bg-gray-100";
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        What is the definition of "{word}"?
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left ${getButtonClass(option)}`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VocabularyQuiz;