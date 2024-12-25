import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuizProps {
  word: string;
  correctDefinition: string;
  options: string[];
  grammarFeedback?: { [key: string]: string };
}

const VocabularyQuiz = ({ word, correctDefinition, options, grammarFeedback = {} }: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState(() => shuffleArray([...options]));

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateNewOptions = () => {
    // Create new options by shuffling and slightly modifying existing ones
    const newOptions = options.map(option => {
      if (option === correctDefinition) return option;
      // Generate different incorrect options
      const variations = [
        `${word} ${option.toLowerCase()}`,
        `the ${word} ${option.toLowerCase()}`,
        `${option.replace(word, word + 's')}`,
      ];
      return variations[Math.floor(Math.random() * variations.length)];
    });
    setCurrentOptions(shuffleArray(newOptions));
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === correctDefinition;
    setIsCorrect(correct);
    
    if (correct) {
      toast.success("Correct! Well done!");
      setFeedback("Great job! You've mastered the correct usage of this word.");
    } else {
      if (grammarFeedback[answer]) {
        setFeedback(grammarFeedback[answer]);
        toast.error("Incorrect. Check the feedback below and try the new question!");
        generateNewOptions(); // Generate new options for another try
      } else {
        setFeedback("That's not quite right. Try again with a new set of options.");
        toast.error("Incorrect. Try again!");
        generateNewOptions();
      }
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
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Which is correct?
      </h2>
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