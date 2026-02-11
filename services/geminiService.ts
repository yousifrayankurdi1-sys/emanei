
import { GoogleGenAI, Type } from "@google/genai";
import { Hadith, Source, Category } from "../types";

export const searchAuthenticHadith = async (query: string): Promise<Hadith[]> => {
  // فحص آمن لوجود المفتاح لمنع ReferenceError
  let apiKey = '';
  try {
    apiKey = (window as any).process?.env?.API_KEY || '';
  } catch (e) {
    apiKey = '';
  }

  if (!apiKey || !query) {
    console.warn("API Key missing or empty query");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `البحث عن أحاديث صحيحة 100% فقط من صحيحي البخاري ومسلم تتعلق بـ: "${query}". يجب أن تكون النتائج بتنسيق JSON دقيق وموثق.`,
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
    console.error("Gemini Error:", e);
    return [];
  }
};
