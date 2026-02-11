
import { GoogleGenAI, Type } from "@google/genai";
import { Hadith, Source, Category } from "../types";

export const searchAuthenticHadith = async (query: string): Promise<Hadith[]> => {
  // فحص آمن وشامل لوجود المفتاح
  let apiKey = '';
  try {
    apiKey = (window as any).process?.env?.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  } catch (e) {
    apiKey = '';
  }

  if (!apiKey || !query) {
    console.warn("API Key is missing or query is empty. Make sure API_KEY is set.");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `ابحث عن أحاديث نبوية صحيحة حصراً من البخاري ومسلم تتعلق بـ: "${query}". يجب أن تكون النتائج بصيغة JSON دقيقة ومفصلة.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              narrator: { type: Type.STRING },
              source: { type: Type.STRING },
              number: { type: Type.STRING },
              category: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "text", "narrator", "source", "number", "category", "tags"]
          }
        }
      }
    });

    if (!response || !response.text) return [];
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Gemini API Error:", e);
    return [];
  }
};
