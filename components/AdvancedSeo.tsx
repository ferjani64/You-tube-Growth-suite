
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { generateKeywords, optimizeDescription } from '../services/geminiService';
import type { KeywordData } from '../types';

export const AdvancedSeo: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [isKeywordsLoading, setIsKeywordsLoading] = useState(false);

  const [description, setDescription] = useState('');
  const [optimizedDesc, setOptimizedDesc] = useState('');
  const [isDescLoading, setIsDescLoading] = useState(false);

  const handleGenerateKeywords = async () => {
    if (!topic.trim()) return;
    setIsKeywordsLoading(true);
    const result = await generateKeywords(topic);
    setKeywords(result);
    setIsKeywordsLoading(false);
  };

  const handleOptimizeDescription = async () => {
    if (!description.trim()) return;
    setIsDescLoading(true);
    const result = await optimizeDescription(description);
    setOptimizedDesc(result);
    setIsDescLoading(false);
  };

  const getBadgeColor = (value: 'Low' | 'Medium' | 'High') => {
    switch(value) {
      case 'Low': return 'bg-green-500/20 text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'High': return 'bg-red-500/20 text-red-300';
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Advanced SEO</h2>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Research</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for keyword ideas..."
            />
            <Button onClick={handleGenerateKeywords} isLoading={isKeywordsLoading}>
              Find Keywords
            </Button>
          </div>
          {keywords.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="p-3">Keyword</th>
                    <th className="p-3">Volume</th>
                    <th className="p-3">Competition</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw, i) => (
                    <tr key={i} className="border-b border-gray-700/50">
                      <td className="p-3 text-white">{kw.keyword}</td>
                      <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(kw.volume)}`}>{kw.volume}</span></td>
                      <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(kw.competition)}`}>{kw.competition}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description & Metadata Optimizer</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste your video description here..."
          />
          <div className="mt-4">
            <Button onClick={handleOptimizeDescription} isLoading={isDescLoading} variant="secondary">
              Optimize Description
            </Button>
          </div>
          {optimizedDesc && (
             <div className="mt-6 bg-gray-800/50 p-4 rounded-md">
              <h4 className="font-semibold text-lg text-white mb-2">Optimized Version:</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{optimizedDesc}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
