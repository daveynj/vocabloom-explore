import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WordCardProps {
  word: string;
  definition: string;
  examples: string[];
  partOfSpeech: string;
}

const WordCard = ({ word, definition, examples, partOfSpeech }: WordCardProps) => {
  return (
    <Card className="w-full max-w-2xl bg-secondary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          {word} <span className="text-lg text-gray-600 italic">({partOfSpeech})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Definition:</h3>
          <p className="text-gray-700">{definition}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Examples:</h3>
          <ul className="space-y-2">
            {examples.map((example, index) => (
              <li key={index} className="text-gray-700">
                {example}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordCard;