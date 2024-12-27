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
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  // Fetch vocabulary words
  useEffect(() => {
    const fetchWords = async () => {
      console.log('Fetching vocabulary words...');
      try {
        const { data, error } = await supabase
          .from('vocabulary_words')
          .select('*');
        
        if (error) {
          console.error('Error fetching words:', error);
          toast.error('Failed to load vocabulary words');
          setLoading(false);
          return;
        }
        
        console.log('Fetched words:', data);
        if (data && data.length > 0) {
          setVocabularyWords(data);
          setLoading(false);
        } else {
          console.log('No vocabulary words found');
          toast.error('No vocabulary words available');
          setLoading(false);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  // Fetch quizzes for current word
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!vocabularyWords[currentWordIndex]) {
        console.log('No current word available for fetching quizzes');
        return;
      }

      console.log('Fetching quizzes for word:', vocabularyWords[currentWordIndex].word);
      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('word_id', vocabularyWords[currentWordIndex].id);
        
        if (error) {
          console.error('Error fetching quizzes:', error);
          toast.error('Failed to load quizzes');
          return;
        }
        
        console.log('Fetched quizzes:', data);
        if (data) {
          setQuizzes(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching quizzes:', err);
        toast.error('Failed to load quizzes');
      }
    };

    if (vocabularyWords.length > 0) {
      fetchQuizzes();
    }
  }, [currentWordIndex, vocabularyWords]);

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % vocabularyWords.length;
      console.log('Moving to next word:', vocabularyWords[nextIndex]?.word);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we fetch your vocabulary content</p>
        </div>
      </div>
    );
  }

  if (!vocabularyWords.length) {
    return (
      <div className="min-h-screen bg-secondary/50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">No vocabulary words available</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  const currentWord = vocabularyWords[currentWordIndex];

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
            key={`${quiz.id}-${currentWordIndex}-${index}`}
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