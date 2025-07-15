
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    pros: {
      type: Type.ARRAY,
      description: 'A list of 3 to 5 potential benefits, advantages, or positive outcomes of making this decision. Each point should be a concise, clear statement.',
      items: {
        type: Type.STRING
      }
    },
    cons: {
      type: Type.ARRAY,
      description: 'A list of 3 to 5 potential drawbacks, disadvantages, or negative outcomes of making this decision. Each point should be a concise, clear statement.',
      items: {
        type: Type.STRING
      }
    }
  },
  required: ['pros', 'cons']
};

export const analyzeDecision = async (decision: string): Promise<{ pros: string[]; cons: string[] }> => {
  try {
    const prompt = `Analyze the pros and cons of the following decision: "${decision}". Provide a balanced view, considering various aspects like financial, personal, and long-term impacts.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("API returned an empty response.");
    }
    
    const parsed = JSON.parse(jsonText);
    
    if (!parsed.pros || !parsed.cons) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return {
      pros: parsed.pros || [],
      cons: parsed.cons || [],
    };
  } catch (error) {
    console.error("Error analyzing decision:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
