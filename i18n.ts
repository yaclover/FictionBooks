
import { useState } from 'react';
import { Language } from './types';

const translations = {
  en: {
    app_title: "Fiction Library",
    library: "Manuscripts",
    add_book: "Add Book",
    search_placeholder: "Search volume...",
    sort_year: "Sort by Year",
    sort_score: "Sort by Impact",
    the_pitch: "The Core Idea",
    about: "The Legacy",
    characters: "Key Persona",
    storyline: "The Narrative Arc",
    themes: "Inherent Themes",
    vibe: "Reading Tone",
    tags: "Catalog Tags",
    edit: "Refine Summary",
    regenerate_cover: "Regenerate Art",
    save_user_version: "Commit Changes",
    cancel: "Discard",
    by: "By",
    published: "Publication Year",
    impact: "Impact Score",
    init_ai_content: "Curate Initial Collection",
    init_ai_desc: "Initialize the library with AI-generated Art Deco covers and structural narratives.",
    generating_all: "Assembling the library archives...",
    // Added missing translation keys
    curate_btn: "Curate Collection",
    add_volume: "Acquire New Volume",
    acquiring: "Acquiring...",
    book_title: "Book Title (English)",
    chinese_title: "Book Title (Chinese)",
    author_name: "Author (English)",
    chinese_author: "Author (Chinese)"
  },
  'zh-TW': {
    app_title: "小說圖書館",
    library: "館藏目錄",
    add_book: "新增書籍",
    search_placeholder: "搜尋書名或作者...",
    sort_year: "按出版年份",
    sort_score: "按文學重要度",
    the_pitch: "核心推介",
    about: "文學價值",
    characters: "主要角色",
    storyline: "敘事結構",
    themes: "核心主題",
    vibe: "閱讀氛圍",
    tags: "標籤",
    edit: "修改摘要",
    regenerate_cover: "重新生成封面",
    save_user_version: "保存變更",
    cancel: "放棄",
    by: "作者：",
    published: "出版年份：",
    impact: "文學重要度：",
    init_ai_content: "使用 AI 初始化館藏",
    init_ai_desc: "系統將自動生成裝飾藝術風格封面與結構化故事情節摘要。",
    generating_all: "正在整理館藏系列...",
    // Added missing translation keys
    curate_btn: "整理館藏",
    add_volume: "新增館藏卷軸",
    acquiring: "正在採購中...",
    book_title: "英文書名",
    chinese_title: "中文書名",
    author_name: "英文作者",
    chinese_author: "中文作者"
  }
};

export function useTranslation() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('fiction_lib_lang') as Language) || 'zh-TW';
  });

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || key;
  };

  const toggleLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('fiction_lib_lang', newLang);
  };

  return { t, lang, toggleLang };
}
