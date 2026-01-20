
import { GoogleGenAI, Type } from "@google/genai";
import { SummaryJson, Language } from "../types";
import { SUMMARY_MODEL, IMAGE_MODEL } from "../constants";

const SUMMARY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    elevator_pitch: { type: Type.STRING },
    main_characters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING },
          motivation: { type: Type.STRING },
        },
        required: ["name", "role", "motivation"]
      }
    },
    storyline: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A coherent sequence of paragraphs telling the story from beginning to end." },
    themes: { type: Type.ARRAY, items: { type: Type.STRING } },
    literary_legacy: { type: Type.STRING },
    reading_vibe: {
      type: Type.OBJECT,
      properties: {
        pacing: { type: Type.STRING },
        tone: { type: Type.STRING },
      },
      required: ["pacing", "tone"]
    },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: [
    "elevator_pitch", "main_characters", "storyline", "themes", "literary_legacy", "reading_vibe", "tags"
  ]
};

export async function generateDualLanguageSummary(
  title: string, 
  author: string | null, 
  year: number | null,
  titleZh?: string | null,
  authorZh?: string | null
): Promise<{ en: SummaryJson, zh: SummaryJson }> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a structural, plot-forward narrative for BOTH English (en) and Traditional Chinese (zh-TW).
    The summary must be coherent and explain the whole book structure.
    
    Book: ${title} / ${titleZh || ""}
    Author: ${author || ""} / ${authorZh || ""}
    
    Return a single JSON with keys: "en" and "zh-TW". Use Traditional Chinese (zh-TW).
  `;

  const response = await ai.models.generateContent({
    model: SUMMARY_MODEL,
    contents: prompt,
    config: {
      systemInstruction: "You write coherent structural book narratives. No spoilers split, just explain the story clearly from beginning to end in a few structural paragraphs.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          en: SUMMARY_SCHEMA,
          "zh-TW": SUMMARY_SCHEMA
        },
        required: ["en", "zh-TW"]
      }
    }
  });

  const parsed = JSON.parse(response.text);
  return { en: parsed.en, zh: parsed["zh-TW"] };
}

export async function generateArtDecoCover(title: string, author: string | null, summary?: SummaryJson): Promise<{ imageUrl: string; prompt: string }> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Minimalist Art Deco cover background (no text). Geometric symmetry, thin gold decorative frame, limited color palette, subtle aged paper texture, abstract central symbol for: ${title}. NO CHARACTERS. NO TEXT.`;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: { aspectRatio: "2:3", imageSize: "1K" }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return { imageUrl, prompt: prompt };
}
