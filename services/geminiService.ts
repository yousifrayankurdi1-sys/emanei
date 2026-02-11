import { GoogleGenAI, Type } from "@google/genai";
import { Hadith, Source, Category } from "../types";

// Always use named parameter for apiKey and assume it is available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchAuthenticHadith = async (query: string): Promise<Hadith[]> => {
  if (!query) return [];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `البحث عن أحاديث صحيحة 100% فقط من صحيحي البخاري ومسلم تتعلق بـ: "${query}". 
    يجب أن تكون النتائج دقيقة تماماً وموثقة. لا ترجع أحاديث ضعيفة أو حسنة.`,
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
            source: { 
              type: Type.STRING, 
              enum: [Source.BUKHARI, Source.MUSLIM, Source.AGREED] 
            },
            number: { type: Type.STRING },
            category: { 
              type: Type.STRING,
              enum: [Category.AQIDAH, Category.MORALS, Category.WORSHIP, Category.TRANSACTIONS, Category.GENERAL]
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["id", "text", "narrator", "source", "number", "category", "tags"]
        }
      }
    }
  });

  try {
    // Extract text from GenerateContentResponse property directly
    const jsonStr = response.text || '[]';
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};