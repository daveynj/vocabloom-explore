import React, { useState, useEffect } from "react";
import WordCard from "@/components/WordCard";
import VocabularyQuiz from "@/components/VocabularyQuiz";
import VocabularyArticle from "@/components/VocabularyArticle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [vocabularyWords, setVocabularyWords] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  // Fetch vocabulary words
  useEffect(() => {
    const fetchWords = async () => {
      const { data, error } = await supabase
        .from('vocabulary_words')
        .select('*');
      
      if (error) {
        console.error('Error fetching words:', error);
        toast.error('Failed to load vocabulary words');
        return;
      }
      
      setVocabularyWords(data);
    };

    fetchWords();
  }, []);

  // Fetch quizzes for current word
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!vocabularyWords[currentWordIndex]) return;

      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('word_id', vocabularyWords[currentWordIndex].id);
      
      if (error) {
        console.error('Error fetching quizzes:', error);
        toast.error('Failed to load quizzes');
        return;
      }
      
      setQuizzes(data);
    };

    fetchQuizzes();
  }, [currentWordIndex, vocabularyWords]);

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % vocabularyWords.length;
      toast.success(`New word: ${vocabularyWords[nextIndex]?.word}`);
      return nextIndex;
    });
  };

  const handleQuizResult = (isCorrect: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));
  };

  const currentWord = vocabularyWords[currentWordIndex];

  if (!currentWord) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary/50 py-8 px-4">
      <div className="container mx-auto space-y-12 flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-bold text-center text-primary">
            ESL Vocabulary Practice
          </h1>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">Score:</p>
            <p className="text-success">Correct: {score.correct}</p>
            <p className="text-destructive">Incorrect: {score.incorrect}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <WordCard
            word={currentWord.word}
            definition={currentWord.definition}
            examples={[]} // We'll need to fetch examples from the examples table
            partOfSpeech="noun" // This should come from the database
          />
          
          <Button 
            onClick={handleNextWord}
            className="w-full max-w-2xl"
          >
            Next Word
          </Button>
        </div>
        
        {quizzes.map((quiz, index) => (
          <VocabularyQuiz
            key={`${quiz.id}-${currentWordIndex}`}
            word={currentWord.word}
            correctDefinition={quiz.options[quiz.correct_answer]}
            options={quiz.options}
            question={quiz.question}
            quizType={quiz.quiz_type}
            onQuizComplete={handleQuizResult}
          />
        ))}

        <VocabularyArticle 
          word={currentWord.word}
          definition={currentWord.definition}
          partOfSpeech="noun" // This should come from the database
        />
      </div>
    </div>
  );
};

export default Index;
