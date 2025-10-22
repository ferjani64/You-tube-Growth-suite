
export type View = 'dashboard' | 'analysis' | 'thumbnails' | 'seo' | 'engagement' | 'planning';

export interface KeywordData {
  keyword: string;
  volume: 'Low' | 'Medium' | 'High';
  competition: 'Low' | 'Medium' | 'High';
}
