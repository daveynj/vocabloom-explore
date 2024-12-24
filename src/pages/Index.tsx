import React from "react";
import WordCard from "@/components/WordCard";
import VocabularyQuiz from "@/components/VocabularyQuiz";

// This would typically come from an API or database
const sampleWord = {
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
};

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary/50 py-8 px-4">
      <div className="container mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          ESL Vocabulary Practice
        </h1>
        
        <WordCard
          word={sampleWord.word}
          definition={sampleWord.definition}
          examples={sampleWord.examples}
        />
        
        <VocabularyQuiz
          word={sampleWord.word}
          correctDefinition={sampleWord.definition}
          options={sampleWord.quizOptions}
        />
      </div>
    </div>
  );
};

export default Index;