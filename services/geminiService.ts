
import { GoogleGenAI, Type } from "@google/genai";
import { Hadith } from "../types";

export const searchAuthenticHadith = async (query: string): Promise<Hadith[]> => {
  // استخدام مفتاح API من البيئة مباشرة كما تقتضي التعليمات
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبير في السنة النبوية، ابحث في صحيح البخاري وصحيح مسلم فقط عن أحاديث تتعلق بـ: "${query}". 
      يجب أن تكون النتيجة بتنسيق JSON حصراً كقائمة من الكائنات.
      كل كائن يجب أن يحتوي على: id (رقم فريد)، text (نص الحديث كاملاً)، narrator (الراوي)، source (اسم المصدر: صحيح البخاري أو صحيح مسلم)، number (رقم الحديث في المصدر)، category (التصنيف)، tags (قائمة كلمات دلالية).`,
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

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};
