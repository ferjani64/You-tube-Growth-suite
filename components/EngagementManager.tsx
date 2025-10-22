
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { generateCommentReplies, analyzeSentiment } from '../services/geminiService';

export const EngagementManager: React.FC = () => {
  const [comment, setComment] = useState('');
  const [replies, setReplies] = useState<string[]>([]);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  
  const [sentiment, setSentiment] = useState('');
  const [isSentimentLoading, setIsSentimentLoading] = useState(false);

  const handleGenerateReplies = async () => {
    if (!comment.trim()) return;
    setIsRepliesLoading(true);
    const result = await generateCommentReplies(comment);
    setReplies(result);
    setIsRepliesLoading(false);
  };
  
  const handleAnalyzeSentiment = async () => {
    if (!comment.trim()) return;
    setIsSentimentLoading(true);
    const result = await analyzeSentiment(comment);
    setSentiment(result);
    setIsSentimentLoading(false);
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Engagement Manager</h2>

      <Card>
        <CardHeader><CardTitle>Intelligent Comment Response System</CardTitle></CardHeader>
        <CardContent>
          <Textarea 
            rows={3} 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Paste a comment here to generate replies or analyze sentiment..." />
          <div className="mt-4 flex flex-wrap gap-4">
            <Button onClick={handleGenerateReplies} isLoading={isRepliesLoading}>Generate Replies</Button>
            <Button onClick={handleAnalyzeSentiment} isLoading={isSentimentLoading} variant="secondary">Analyze Sentiment</Button>
          </div>

          {replies.length > 0 && (
             <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-200 mb-2">Suggested Replies:</h4>
              <div className="space-y-3">
                {replies.map((reply, i) => (
                    <div key={i} className="bg-gray-800/50 p-3 rounded-md text-gray-300">
                        {reply}
                    </div>
                ))}
              </div>
            </div>
          )}

          {sentiment && (
             <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-200 mb-2">Sentiment Analysis:</h4>
              <div className="bg-gray-800/50 p-3 rounded-md text-gray-300">
                {sentiment}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
