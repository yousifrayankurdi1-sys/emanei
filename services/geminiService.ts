
import { GoogleGenAI, Type } from "@google/genai";
import { Hadith, Source, Category } from "../types";

export const searchAuthenticHadith = async (query: string): Promise<Hadith[]> => {
  // فحص أمان أولي لمنع الشاشة البيضاء
  const apiKey = process.env.API_KEY;
  if (!apiKey || !query) {
    console.error("API Key is missing or query is empty");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `البحث عن أحاديث صحيحة 100% فقط من صحيحي البخاري ومسلم تتعلق بـ: "${query}". يجب أن تكون النتائج بتنسيق JSON دقيق.`,
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
    console.error("Gemini Critical Error:", e);
    return [];
  }
};
