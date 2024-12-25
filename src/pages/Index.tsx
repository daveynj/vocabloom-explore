import React, { useState } from "react";
import WordCard from "@/components/WordCard";
import VocabularyQuiz from "@/components/VocabularyQuiz";
import VocabularyArticle from "@/components/VocabularyArticle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const vocabularyWords = [
  {
    word: "Perseverance",
    partOfSpeech: "noun",
    definition: "Continued effort to do or achieve something despite difficulties",
    quizCorrectAnswer: "The quality of continuing to try despite challenges and setbacks",
    examples: [
      "Her perseverance in learning English finally paid off when she got her dream job.",
      "Through perseverance and dedication, he mastered the challenging vocabulary.",
    ],
    quizOptions: [
      "The quality of continuing to try despite challenges and setbacks",
      "The act of giving up when things get tough",
      "A short break between activities",
      "A type of celebration or festival",
    ],
  },
  {
    word: "Diligent",
    partOfSpeech: "adjective",
    definition: "Having or showing care and conscientiousness in one's work or duties",
    quizCorrectAnswer: "Showing persistent and hardworking effort in tasks",
    examples: [
      "The diligent student reviewed her vocabulary cards every day.",
      "His diligent study habits helped him improve his English quickly.",
    ],
    quizOptions: [
      "Showing persistent and hardworking effort in tasks",
      "Being lazy or careless",
      "Moving very quickly",
      "Speaking multiple languages",
    ],
  },
  {
    word: "Resilient",
    partOfSpeech: "adjective",
    definition: "Able to withstand or recover quickly from difficult conditions",
    quizCorrectAnswer: "Having the strength to bounce back from tough situations",
    examples: [
      "Learning a new language requires being resilient when facing challenges.",
      "The resilient learner didn't give up despite making mistakes.",
    ],
    quizOptions: [
      "Having the strength to bounce back from tough situations",
      "Being easily discouraged",
      "Having a good memory",
      "Speaking very loudly",
    ],
  },
];

const Index = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % vocabularyWords.length;
      toast.success(`New word: ${vocabularyWords[nextIndex].word}`);
      return nextIndex;
    });
  };

  const currentWord = vocabularyWords[currentWordIndex];

  return (
    <div className="min-h-screen bg-secondary/50 py-8 px-4">
      <div className="container mx-auto space-y-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-primary">
          ESL Vocabulary Practice
        </h1>

        <div className="flex flex-col items-center gap-4 w-full">
          <WordCard
            word={currentWord.word}
            definition={currentWord.definition}
            examples={currentWord.examples}
            partOfSpeech={currentWord.partOfSpeech}
          />
          
          <Button 
            onClick={handleNextWord}
            className="w-full max-w-2xl"
          >
            Next Word
          </Button>
        </div>
        
        <VocabularyQuiz
          word={currentWord.word}
          correctDefinition={currentWord.quizCorrectAnswer}
          options={currentWord.quizOptions}
        />

        <VocabularyArticle 
          word={currentWord.word}
          definition={currentWord.definition}
          partOfSpeech={currentWord.partOfSpeech}
        />
      </div>
    </div>
  );
};

export default Index;