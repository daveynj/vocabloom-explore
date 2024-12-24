import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VocabularyArticleProps {
  word: string;
  definition: string;
}

const VocabularyArticle = ({ word, definition }: VocabularyArticleProps) => {
  // Generate a contextual article based on the current word
  const article = `In a recent study about learning methods, researchers observed the importance of ${word.toLowerCase()} 
    in achieving academic success. Students who demonstrated ${word.toLowerCase()} in their studies showed remarkable progress. 
    The study defines ${word.toLowerCase()} as "${definition}". This quality proved essential for overcoming challenges 
    and reaching educational goals.`;

  const discussionQuestions = [
    `How does ${word.toLowerCase()} contribute to success in learning?`,
    `Can you share a personal experience where you demonstrated ${word.toLowerCase()}?`,
    `Why is ${word.toLowerCase()} important in everyday life?`,
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