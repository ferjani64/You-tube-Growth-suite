
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { generateTitleSuggestions } from '../services/geminiService';

export const SmartAnalysis: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    const result = await generateTitleSuggestions(topic);
    setSuggestions(result);
    setIsLoading(false);
  };

  const trendingTopics = [
    { title: "The Future of AI in Gaming", niche: "Tech", views: "1.2M" },
    { title: "10-Minute Full Body HIIT Workout", niche: "Fitness", views: "850k" },
    { title: "Making Sourdough Bread From Scratch", niche: "Cooking", views: "2.1M" },
  ];

  const competitors = [
    { name: "TechFlow", growth: "+15%", viralContent: "AI Smartphone Review" },
    { name: "FitLife", growth: "+8%", viralContent: "30-Day Yoga Challenge" },
    { name: "KitchenCraft", growth: "+22%", viralContent: "Viral Pasta Recipe" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Smart Analysis</h2>

      <Card>
        <CardHeader>
          <CardTitle>AI Title & Thumbnail Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your video topic..."
              className="flex-grow"
            />
            <Button onClick={handleGenerate} isLoading={isLoading}>
              Generate Ideas
            </Button>
          </div>
          {suggestions.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Generated Titles:</h4>
              <ul className="list-disc list-inside bg-gray-800/50 p-4 rounded-md">
                {suggestions.map((s, i) => (
                  <li key={i} className="text-gray-300">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Real-Time Trend Scanner</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {trendingTopics.map((topic, i) => (
                <li key={i} className="p-3 bg-gray-800/50 rounded-md">
                  <p className="font-semibold text-white">{topic.title}</p>
                  <div className="flex justify-between text-sm text-brand-muted mt-1">
                    <span>Niche: {topic.niche}</span>
                    <span>Views: {topic.views}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Competitor Analysis</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {competitors.map((c, i) => (
                <li key={i} className="p-3 bg-gray-800/50 rounded-md">
                  <p className="font-semibold text-white">{c.name}</p>
                   <div className="flex justify-between text-sm text-brand-muted mt-1">
                    <span>Growth: <span className="text-green-400">{c.growth}</span></span>
                    <span>Hot Video: {c.viralContent}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
