import React from "react";
import WordCard from "@/components/WordCard";
import VocabularyQuiz from "@/components/VocabularyQuiz";
import VocabularyArticle from "@/components/VocabularyArticle";

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
  return (
    <div className="min-h-screen bg-secondary/50 py-8 px-4">
      <div className="container mx-auto space-y-12">
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

        <VocabularyArticle words={vocabularyList} />
      </div>
    </div>
  );
};

export default Index;