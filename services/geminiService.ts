
import { GoogleGenAI, Type } from "@google/genai";
import { VibeMetadata } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateVibeMetadata = async (vibe: string): Promise<VibeMetadata> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the mood or vibe description: "${vibe}", generate a cohesive artistic title, a short poetic description, and a hex-code color palette (5 colors).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          palette: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "description", "palette"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as VibeMetadata;
  } catch (e) {
    throw new Error("Failed to parse vibe metadata");
  }
};

export const generateVibeImage = async (vibe: string, metadata: VibeMetadata): Promise<string> => {
  const prompt = `An abstract artistic masterpiece representing the theme: "${metadata.title}". 
                  The mood is ${metadata.description}. 
                  The primary colors are ${metadata.palette.join(', ')}. 
                  Original user vibe: ${vibe}. 
                  High definition, fine art style, minimalist but expressive.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (part?.inlineData) {
    return `data:image/png;base64,${part.inlineData.data}`;
  }
  
  throw new Error("No image data found in response");
};
