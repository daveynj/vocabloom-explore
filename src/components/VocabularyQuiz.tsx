import React, { useState } from "react";
import { toast } from "sonner";
import QuizHeader from "./quiz/QuizHeader";
import QuizOptions from "./quiz/QuizOptions";
import QuizFeedback from "./quiz/QuizFeedback";

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

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback("");
    generateNewOptions();
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm space-y-6">
      <QuizHeader quizType={quizType} question={question} />
      
      <QuizOptions
        options={currentOptions}
        selectedAnswer={selectedAnswer}
        correctDefinition={correctDefinition}
        onSelectAnswer={handleAnswer}
      />
      
      <QuizFeedback
        feedback={feedback}
        isCorrect={isCorrect}
        onReset={resetQuiz}
      />
    </div>
  );
};

export default VocabularyQuiz;