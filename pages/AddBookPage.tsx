
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, saveBook, saveSummary } from '../store';
import { Book, Summary } from '../types';
import { useTranslation } from '../i18n';
import { fetchBookMetadata } from '../services/metadata';
import { generateDualLanguageSummary, generateArtDecoCover } from '../services/gemini';
import { COVER_STYLE_VERSION } from '../constants';

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [title, setTitle] = useState('');
  const [titleZh, setTitleZh] = useState('');
  const [author, setAuthor] = useState('');
  const [authorZh, setAuthorZh] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const existing = getBooks().find(b => 
      b.title.toLowerCase() === title.toLowerCase() || 
      (titleZh && b.titleZh?.toLowerCase() === titleZh.toLowerCase())
    );

    if (existing) {
      setError("This volume already exists in the catalog.");
      return;
    }

    setIsLoading(true);

    try {
      const metadata = await fetchBookMetadata(title, author);
      const finalTitle = metadata?.title || title;
      const finalAuthor = metadata?.author || author || "Unknown";
      const finalYear = metadata?.year || null;

      const { en, zh } = await generateDualLanguageSummary(
        finalTitle, 
        finalAuthor, 
        finalYear,
        titleZh,
        authorZh
      );

      const needsKey = !await (window as any).aistudio.hasSelectedApiKey();
      if (needsKey) await (window as any).aistudio.openSelectKey();
      
      let coverUrl = null;
      let coverPrompt = null;
      try {
        const coverRes = await generateArtDecoCover(finalTitle, finalAuthor, en);
        coverUrl = coverRes.imageUrl;
        coverPrompt = coverRes.prompt;
      } catch (e) {
        console.warn("Cover generation failed", e);
      }

      const bookId = crypto.randomUUID();
      // Added missing significanceScore to satisfy Book interface
      const newBook: Book = {
        id: bookId,
        title: finalTitle,
        titleZh: titleZh || null,
        author: finalAuthor,
        authorZh: authorZh || null,
        year: finalYear,
        significanceScore: 5,
        coverUrl,
        coverSource: coverUrl ? 'generated' : 'none',
        coverPrompt,
        coverStyleVersion: COVER_STYLE_VERSION,
        seedRank: null,
        sourceName: null,
        sourceUrl: null,
        createdAt: Date.now()
      };

      const enSummary: Summary = {
        id: crypto.randomUUID(),
        bookId,
        language: 'en',
        summaryJson: en,
        createdBy: 'ai',
        version: 1,
        createdAt: Date.now()
      };
      const zhSummary: Summary = {
        id: crypto.randomUUID(),
        bookId,
        language: 'zh-TW',
        summaryJson: zh,
        createdBy: 'ai',
        version: 1,
        createdAt: Date.now()
      };

      saveBook(newBook);
      saveSummary(enSummary);
      saveSummary(zhSummary);

      navigate(`/book/${bookId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to add volume. Check API keys and network.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-serif-header mb-6">{t('add_volume')}</h2>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.4em]">{t('acquiring').toUpperCase()}</p>
      </div>

      <div className="bg-white border-[6px] border-black p-12 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-[6px] border-l-[6px] border-[#d4af37] -m-1.5"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[6px] border-r-[6px] border-[#d4af37] -m-1.5"></div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('book_title')}</label>
              <input
                type="text"
                required
                placeholder="e.g. Brave New World"
                className="w-full border-2 border-black p-4 font-serif-header text-2xl focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 bg-[#fcfaf2]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('chinese_title')}</label>
              <input
                type="text"
                placeholder="例如：美麗新世界"
                className="w-full border-2 border-black p-4 font-serif-header text-2xl focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 bg-[#fcfaf2]"
                value={titleZh}
                onChange={(e) => setTitleZh(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('author_name')}</label>
              <input
                type="text"
                placeholder="e.g. Aldous Huxley"
                className="w-full border-2 border-black p-4 font-serif-header text-2xl focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 bg-[#fcfaf2]"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('chinese_author')}</label>
              <input
                type="text"
                placeholder="例如：阿道司·赫胥黎"
                className="w-full border-2 border-black p-4 font-serif-header text-2xl focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 bg-[#fcfaf2]"
                value={authorZh}
                onChange={(e) => setAuthorZh(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-5 bg-red-100 text-red-800 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-4">
              <span className="text-2xl">!</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white font-art-deco-title text-4xl py-7 hover:bg-[#d4af37] transition-all disabled:bg-gray-400 relative overflow-hidden group shadow-[0_12px_0_#d4af37] active:translate-y-1 active:shadow-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-5">
                <div className="w-9 h-9 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                {t('acquiring').toUpperCase()}
              </span>
            ) : (
              t('curate_btn').toUpperCase()
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
