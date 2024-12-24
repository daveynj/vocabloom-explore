import React, { useState } from "react";
import WordCard from "@/components/WordCard";
import VocabularyQuiz from "@/components/VocabularyQuiz";
import VocabularyArticle from "@/components/VocabularyArticle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// This would typically come from an API or database
const vocabularyWords = [
  {
    word: "Perseverance",
    definition: "Continued effort to do or achieve something despite difficulties",
    examples: [
      "Her perseverance in learning English finally paid off when she got her dream job.",
      "Through perseverance and dedication, he mastered the challenging vocabulary.",
    ],
    quizOptions: [
      "Continued effort to do or achieve something despite difficulties",
      "The act of giving up when things get tough",
      "A short break between activities",
      "A type of celebration or festival",
    ],
  },
  {
    word: "Diligent",
    definition: "Having or showing care and conscientiousness in one's work or duties",
    examples: [
      "The diligent student reviewed her vocabulary cards every day.",
      "His diligent study habits helped him improve his English quickly.",
    ],
    quizOptions: [
      "Having or showing care and conscientiousness in one's work or duties",
      "Being lazy or careless",
      "Moving very quickly",
      "Speaking multiple languages",
    ],
  },
  {
    word: "Resilient",
    definition: "Able to withstand or recover quickly from difficult conditions",
    examples: [
      "Learning a new language requires being resilient when facing challenges.",
      "The resilient learner didn't give up despite making mistakes.",
    ],
    quizOptions: [
      "Able to withstand or recover quickly from difficult conditions",
      "Being easily discouraged",
      "Having a good memory",
      "Speaking very loudly",
    ],
  },
];

// Sample vocabulary list for the article
const vocabularyList = [
  {
    word: "Perseverance",
    definition: "Continued effort to do or achieve something despite difficulties",
  },
  {
    word: "Dedication",
    definition: "The quality of being committed to a task or purpose",
  },
  {
    word: "Observation",
    definition: "The action or process of carefully watching or monitoring something",
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
      <div className="container mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          ESL Vocabulary Practice
        </h1>

        <div className="flex flex-col items-center gap-4">
          <WordCard
            word={currentWord.word}
            definition={currentWord.definition}
            examples={currentWord.examples}
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
          correctDefinition={currentWord.definition}
          options={currentWord.quizOptions}
        />

        <VocabularyArticle words={vocabularyList} />
      </div>
    </div>
  );
};

export default Index;