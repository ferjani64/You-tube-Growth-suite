
import { GoogleGenAI, Type } from "@google/genai";
import type { KeywordData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  // In the target environment, process.env.API_KEY is assumed to be available.
  console.warn("API_KEY environment variable not set. Using a placeholder. Functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'MISSING_API_KEY' });

export const generateTitleSuggestions = async (topic: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 click-worthy and SEO-optimized YouTube titles for a video about "${topic}". Return only a JSON array of strings. Example: ["Title 1", "Title 2"]`,
    });
    const text = response.text.trim().replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating title suggestions:", error);
    return [`Failed to generate titles for: ${topic}`];
  }
};

export const simulateCtr = async (descA: string, descB: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze these two YouTube thumbnail concepts and predict which one would likely have a higher Click-Through Rate (CTR). Provide a concise explanation.
            
            Thumbnail A Concept: "${descA}"
            
            Thumbnail B Concept: "${descB}"
            `,
        });
        return response.text;
    } catch (error) {
        console.error("Error simulating CTR:", error);
        return "Could not simulate CTR. The AI service may be unavailable.";
    }
}

export const generateKeywords = async (topic: string): Promise<KeywordData[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a list of 15 related keywords for the YouTube topic "${topic}". Include long-tail keywords. Provide a fictional but realistic search volume (Low, Medium, High) and competition score (Low, Medium, High) for each.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            keyword: { type: Type.STRING },
                            volume: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                            competition: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                        },
                        required: ["keyword", "volume", "competition"]
                    }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating keywords:", error);
        return [];
    }
}

export const optimizeDescription = async (description: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Optimize the following YouTube video description for better SEO and viewer engagement. Keep the core message but improve wording, structure, and add relevant keywords. Original description: "${description}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error optimizing description:", error);
        return "Could not optimize description. The AI service may be unavailable.";
    }
}

export const generateCommentReplies = async (comment: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate 3 distinct, engaging replies to this YouTube comment: "${comment}". One reply should be inquisitive, one should be appreciative, and one should be humorous. Return only a JSON array of strings. Example: ["Reply 1", "Reply 2", "Reply 3"]`,
        });
        const text = response.text.trim().replace(/```json/g, '').replace(/```/g, '');
        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating comment replies:", error);
        return ["Failed to generate replies."];
    }
}

export const analyzeSentiment = async (comment: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the sentiment of the following YouTube comment and classify it as Positive, Negative, or Neutral. Provide a one-sentence justification. Comment: "${comment}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return "Could not analyze sentiment.";
    }
}

export const suggestPostTimes = async (niche: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on general audience behavior for the YouTube niche "${niche}", suggest 3 optimal posting times (including timezone, e.g., EST) for weekdays and weekends to maximize initial viewership.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error suggesting post times:", error);
        return "Could not suggest post times.";
    }
}
