
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { suggestPostTimes } from '../services/geminiService';

const CalendarDay: React.FC<{ day: number | null; hasEvent?: boolean }> = ({ day, hasEvent }) => (
    <div className={`h-24 border border-gray-700/50 p-2 flex flex-col ${day ? 'bg-brand-surface' : 'bg-gray-800/50'}`}>
        {day && <span className="font-semibold text-white">{day}</span>}
        {hasEvent && <div className="mt-auto bg-brand-primary h-2 w-full rounded-full"></div>}
    </div>
);

export const ContentPlanner: React.FC = () => {
    const [niche, setNiche] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSuggestTimes = async () => {
        if(!niche.trim()) return;
        setIsLoading(true);
        const result = await suggestPostTimes(niche);
        setSuggestions(result);
        setIsLoading(false);
    }
    
    // Mock calendar data
    const daysInMonth = [null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const events = [5, 12, 19, 26];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Content Planner</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader><CardTitle>Smart Calendar - August 2024</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 text-center font-bold text-brand-muted mb-2">
                        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>
                    <div className="grid grid-cols-7">
                        {daysInMonth.map((day, i) => (
                           <CalendarDay key={i} day={day} hasEvent={day ? events.includes(day) : false} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader><CardTitle>Optimal Timing Suggestions</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-brand-muted mb-4">Enter your channel's niche to get AI-powered suggestions for the best times to post.</p>
                    <Input 
                        value={niche}
                        onChange={e => setNiche(e.target.value)}
                        placeholder="e.g., Tech Reviews, Fitness, Cooking" 
                        className="mb-4"
                    />
                    <Button onClick={handleSuggestTimes} isLoading={isLoading} className="w-full">Get Suggestions</Button>
                    {suggestions && (
                        <div className="mt-6 bg-gray-800/50 p-4 rounded-md">
                            <h4 className="font-semibold text-lg text-white mb-2">Posting Time Advice:</h4>
                            <p className="text-gray-300 whitespace-pre-wrap">{suggestions}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};
