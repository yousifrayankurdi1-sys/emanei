
import { GoogleGenAI, Type } from "@google/genai";
import { Hadith, Source, Category } from "../types";

export const searchAuthenticHadith = async (query: string): Promise<Hadith[]> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `أنت خبير في "الجامع المسند الصحيح" للبخاري و"المسند الصحيح" لمسلم. 
      مهمتك: استخراج كافة الأحاديث المتعلقة بـ: "${query}" من الكتابين فقط.
      القواعد:
      1. لا تكرر الأحاديث إذا وردت في الكتابين (اختر الرواية الأتم).
      2. تأكد من صحة رقم الحديث والمصدر بدقة.
      3. يجب أن تكون النتيجة JSON حصراً.
      4. التصنيفات المتاحة: عقيدة، أخلاق، عبادات، معاملات، عام.
      
      التنسيق المطلوب لكل حديث:
      {
        "id": "معرف فريد",
        "text": "نص الحديث كاملاً مع التشكيل إن أمكن",
        "narrator": "اسم الصحابي الراوي",
        "source": "صحيح البخاري" أو "صحيح مسلم",
        "number": "رقم الحديث",
        "category": "أحد التصنيفات المذكورة",
        "tags": ["كلمات مفتاحية"]
      }`,
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
    
    const results = JSON.parse(text.trim());
    return results.map((r: any) => ({
      ...r,
      source: r.source.includes("البخاري") ? Source.BUKHARI : (r.source.includes("مسلم") ? Source.MUSLIM : Source.AGREED)
    }));
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};
