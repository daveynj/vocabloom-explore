import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VocabularyArticleProps {
  word: string;
  definition: string;
  partOfSpeech: string;
}

const VocabularyArticle = ({ word = "", definition = "", partOfSpeech = "" }: VocabularyArticleProps) => {
  const getArticleContent = () => {
    switch (partOfSpeech) {
      case "noun":
        return `${word} is a fundamental quality that many successful people possess. 
        Recent studies have shown that ${word?.toLowerCase()} - ${definition} - plays a crucial role 
        in achieving long-term goals. Researchers found that individuals who demonstrate high levels 
        of ${word?.toLowerCase()} consistently outperform their peers in both academic and professional settings.`;
      case "adjective":
        return `Being ${word?.toLowerCase()} is increasingly recognized as a valuable trait in today's fast-paced world. 
        When someone is ${word?.toLowerCase()}, meaning they ${definition}, they tend to achieve better results 
        in their endeavors. Recent workplace studies have highlighted how ${word?.toLowerCase()} individuals 
        often become natural leaders in their fields.`;
      default:
        return `The concept of ${word?.toLowerCase()} has gained significant attention in recent years. 
        Understanding what it means to be ${word?.toLowerCase()} - ${definition} - can help us 
        develop better strategies for personal and professional growth. Experts emphasize that this 
        quality is particularly valuable in challenging situations.`;
    }
  };

  const getDiscussionQuestions = () => {
    switch (partOfSpeech) {
      case "noun":
        return [
          `How has ${word?.toLowerCase()} helped you overcome a specific challenge in your life?`,
          `Why do you think ${word?.toLowerCase()} is considered important for success?`,
          `Can you think of someone who exemplifies ${word?.toLowerCase()}? What can we learn from them?`,
        ];
      case "adjective":
        return [
          `What does it mean to you to be ${word?.toLowerCase()}?`,
          `Can you describe a situation where being ${word?.toLowerCase()} helped you achieve a goal?`,
          `How can we develop this ${word?.toLowerCase()} quality in our daily lives?`,
        ];
      default:
        return [
          `How does ${word?.toLowerCase()} contribute to personal growth?`,
          `Can you share an experience related to ${word?.toLowerCase()}?`,
          `Why is ${word?.toLowerCase()} important in today's world?`,
        ];
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Practice Reading</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Article</h3>
          <p className="text-gray-700 leading-relaxed text-center">{getArticleContent()}</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Discussion Questions</h3>
          <ul className="space-y-2">
            {getDiscussionQuestions().map((question, index) => (
              <li key={index} className="text-gray-700 text-center">{question}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularyArticle;