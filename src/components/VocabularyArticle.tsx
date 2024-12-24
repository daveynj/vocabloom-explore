import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VocabularyArticleProps {
  words: {
    word: string;
    definition: string;
  }[];
}

const VocabularyArticle = ({ words }: VocabularyArticleProps) => {
  // This would typically come from an API, but for now we'll use a sample article
  const article = `In a remarkable display of perseverance, scientists have made groundbreaking discoveries 
    in environmental conservation. Their dedication to protecting our planet's resources has led to innovative 
    solutions for sustainability. Through careful observation and analysis, researchers continue to develop new 
    methods for preserving our natural environment.`;

  const discussionQuestions = [
    "How does perseverance play a role in scientific research?",
    "What are some examples of dedication you've seen in your own life?",
    "Why is observation important in scientific studies?",
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Practice Reading</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Article</h3>
          <p className="text-gray-700 leading-relaxed">{article}</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Discussion Questions</h3>
          <ul className="list-disc pl-6 space-y-2">
            {discussionQuestions.map((question, index) => (
              <li key={index} className="text-gray-700">{question}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyArticle;