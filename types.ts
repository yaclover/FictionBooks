
export interface Character {
  name: string;
  role: string;
  motivation: string;
}

export interface ReadingVibe {
  pacing: string;
  tone: string;
}

export interface SummaryJson {
  elevator_pitch: string;
  main_characters: Character[];
  storyline: string[]; // 連貫的故事情節段落
  themes: string[];
  literary_legacy: string; // 為什麼這本書在文學史上重要
  reading_vibe: ReadingVibe;
  tags: string[];
}

export type Language = 'en' | 'zh-TW';
export type CreatorType = 'ai' | 'user';
export type CoverSource = 'generated' | 'external' | 'none';

export interface Summary {
  id: string;
  bookId: string;
  language: Language;
  summaryJson: SummaryJson;
  createdBy: CreatorType;
  version: number;
  createdAt: number;
}

export interface Book {
  id: string;
  title: string;
  author: string | null;
  titleZh: string | null;
  authorZh: string | null;
  year: number | null;
  significanceScore: number; // 文學重要度 (1-10)
  coverUrl: string | null;
  coverSource: CoverSource;
  coverPrompt: string | null;
  coverStyleVersion: string;
  seedRank: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  createdAt: number;
}
