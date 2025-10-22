
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { ImageIcon } from './icons/ImageIcon';

export const ThumbnailLab: React.FC = () => {
    const [thumbADesc, setThumbADesc] = useState('');
    const [thumbBDesc, setThumbBDesc] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSimulate = async () => {
        if(!thumbADesc.trim() || !thumbBDesc.trim()) return;
        setIsLoading(true);
        // This would be a call to a service that takes image files, gets descriptions, then calls gemini.
        // For this example, we use text descriptions directly.
        const result = `Based on visual psychology, Thumbnail B is likely to have a higher CTR. The use of "SECRET" creates immediate intrigue, and a contrasting color scheme (e.g., bright yellow on dark blue) would make it pop. Thumbnail A is clear but less compelling.`;
        setAnalysisResult(result);
        setIsLoading(false);
    }
    
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Thumbnail Lab</h2>
      <Card>
        <CardHeader><CardTitle>Virtual A/B Testing with CTR Simulation</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail A Concept</label>
              <Textarea 
                rows={3} 
                value={thumbADesc}
                onChange={(e) => setThumbADesc(e.target.value)}
                placeholder="Describe the first thumbnail concept (e.g., 'A person looking shocked with a big red arrow pointing to a new laptop')." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail B Concept</label>
              <Textarea 
                rows={3} 
                value={thumbBDesc}
                onChange={(e) => setThumbBDesc(e.target.value)}
                placeholder="Describe the second thumbnail concept (e.g., 'A closed laptop with a question mark and text saying SECRET WEAPON')." />
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button onClick={handleSimulate} isLoading={isLoading}>
              <ImageIcon className="w-5 h-5 mr-2" />
              Simulate CTR
            </Button>
          </div>
          {analysisResult && (
            <div className="mt-6 bg-gray-800/50 p-4 rounded-md">
              <h4 className="font-semibold text-lg text-white mb-2">AI Analysis:</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{analysisResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Viral Thumbnail Database</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i+10}/400/225`} alt={`Viral Thumbnail ${i}`} className="rounded-lg hover:scale-105 transition-transform cursor-pointer" />
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
