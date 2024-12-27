import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuizProps {
  word: string;
  correctDefinition: string;
  options: string[];
  question: string;
  quizType: string;
  onQuizComplete: (isCorrect: boolean) => void;
  grammarFeedback?: { [key: string]: string };
}

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const VocabularyQuiz = ({ 
  word, 
  correctDefinition, 
  options, 
  question,
  quizType,
  onQuizComplete,
  grammarFeedback = {} 
}: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState(() => shuffleArray([...options]));

  const generateNewOptions = () => {
    setCurrentOptions(shuffleArray([...options]));
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === correctDefinition;
    setIsCorrect(correct);
    onQuizComplete(correct);
    
    if (correct) {
      toast.success("Correct! Well done!");
      setFeedback(`Great job! You've mastered this ${quizType} question.`);
    } else {
      if (grammarFeedback[answer]) {
        setFeedback(grammarFeedback[answer]);
        toast.error("Incorrect. Check the feedback below!");
      } else {
        setFeedback(`That's not quite right. Try another ${quizType} question.`);
        toast.error("Incorrect. Try again!");
      }
      generateNewOptions();
    }
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) return "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200";
    if (option === correctDefinition) return "bg-success text-success-foreground font-semibold";
    if (option === selectedAnswer) return "bg-error text-error-foreground font-semibold";
    return "bg-white text-gray-800 border-2 border-gray-200";
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback("");
    generateNewOptions();
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">
          {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz
        </h2>
      </div>

      <p className="text-lg mb-4">{question}</p>

      <div className="grid grid-cols-1 gap-4">
        {currentOptions.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full min-h-[80px] p-4 text-left text-base leading-relaxed whitespace-normal break-words ${getButtonClass(option)}`}
          >
            {option}
          </Button>
        ))}
      </div>
      
      {feedback && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700">{feedback}</p>
          {!isCorrect && (
            <Button 
              onClick={resetQuiz}
              className="mt-4 w-full"
            >
              Try New Question
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default VocabularyQuiz;