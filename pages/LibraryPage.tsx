
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, getLatestSummary, saveBook, saveSummary } from '../store';
import { Book, Summary } from '../types';
import { useTranslation } from '../i18n';
import { generateDualLanguageSummary, generateArtDecoCover } from '../services/gemini';
import BookCover from '../components/BookCover';

const LibraryPage: React.FC = () => {
  const { t, lang } = useTranslation();
  const [books, setBooks] = useState<Book[]>(() => getBooks());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'score'>('year');
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const search = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(search) || 
          (book.titleZh?.toLowerCase().includes(search)) ||
          book.author?.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.significanceScore - a.significanceScore;
        return (a.year || 0) - (b.year || 0);
      });
  }, [books, searchTerm, sortBy]);

  const missingContentCount = useMemo(() => {
    return books.filter(b => b.coverUrl === null || !getLatestSummary(b.id, 'en')).length;
  }, [books]);

  const handleInitializeAI = async () => {
    const needsKey = !await (window as any).aistudio.hasSelectedApiKey();
    if (needsKey) await (window as any).aistudio.openSelectKey();

    setIsInitializing(true);
    const targetBooks = books.filter(b => b.coverUrl === null || !getLatestSummary(b.id, 'en'));
    setProgress({ current: 0, total: targetBooks.length });

    for (let i = 0; i < targetBooks.length; i++) {
      const b = targetBooks[i];
      try {
        const dual = await generateDualLanguageSummary(b.title, b.author, b.year, b.titleZh, b.authorZh);
        saveSummary({ id: crypto.randomUUID(), bookId: b.id, language: 'en', summaryJson: dual.en, createdBy: 'ai', version: 1, createdAt: Date.now() });
        saveSummary({ id: crypto.randomUUID(), bookId: b.id, language: 'zh-TW', summaryJson: dual.zh, createdBy: 'ai', version: 1, createdAt: Date.now() });
        
        const { imageUrl, prompt } = await generateArtDecoCover(b.title, b.author, dual.en);
        saveBook({ ...b, coverUrl: imageUrl, coverPrompt: prompt, coverSource: 'generated' });
      } catch (err) {
        console.error(err);
      }
      setProgress(prev => ({ ...prev, current: i + 1 }));
    }
    setBooks(getBooks());
    setIsInitializing(false);
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-8 items-end justify-between border-b-2 border-black pb-10">
        <div>
          <h2 className="text-7xl font-serif-header leading-none tracking-tight">{t('library')}</h2>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#d4af37] mt-4">A Chronological Archive of Narrative Art</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="border-2 border-black px-6 py-3 bg-transparent w-full md:w-72 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/20 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex border-2 border-black rounded-sm overflow-hidden font-bold uppercase text-[10px] tracking-widest">
            <button 
              onClick={() => setSortBy('year')}
              className={`px-4 py-2 flex-1 md:flex-none transition-colors ${sortBy === 'year' ? 'bg-black text-white' : 'hover:bg-black/5'}`}
            >
              {t('sort_year')}
            </button>
            <button 
              onClick={() => setSortBy('score')}
              className={`px-4 py-2 flex-1 md:flex-none transition-colors border-l-2 border-black ${sortBy === 'score' ? 'bg-black text-white' : 'hover:bg-black/5'}`}
            >
              {t('sort_score')}
            </button>
          </div>
        </div>
      </div>

      {missingContentCount > 0 && !isInitializing && (
        <div className="bg-[#f4f2e8] border-2 border-black p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[8px_8px_0px_#d4af37]">
          <div>
            <h4 className="font-art-deco-title text-2xl text-[#d4af37] mb-2">{t('init_ai_content')}</h4>
            <p className="text-sm text-gray-600 font-medium">{t('init_ai_desc')}</p>
          </div>
          <button 
            onClick={handleInitializeAI}
            className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-[11px] hover:bg-[#d4af37] transition-all whitespace-nowrap"
          >
            {t('curate_btn')} ({missingContentCount})
          </button>
        </div>
      )}

      {isInitializing && (
        <div className="bg-black text-white p-10 border-b-8 border-[#d4af37]">
           <div className="flex justify-between items-center mb-6">
              <h4 className="font-art-deco-title text-3xl tracking-widest">{t('generating_all')}</h4>
              <span className="text-sm font-bold">{progress.current} / {progress.total}</span>
           </div>
           <div className="w-full bg-white/10 h-2">
              <div 
                className="bg-[#d4af37] h-full transition-all duration-700" 
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-16 gap-x-12">
        {filteredBooks.map(book => (
          <Link key={book.id} to={`/book/${book.id}`} className="group flex flex-col">
            <div className="relative mb-6 transform transition-transform duration-500 group-hover:-translate-y-4">
               <BookCover title={book.title} titleZh={book.titleZh} author={book.author} authorZh={book.authorZh} imageUrl={book.coverUrl} lang={lang} size="md" />
               <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-black text-[#d4af37] flex flex-col items-center justify-center font-art-deco-title border-2 border-[#d4af37] shadow-xl group-hover:scale-110 transition-transform">
                  <span className="text-[10px] leading-none mb-0.5">SCORE</span>
                  <span className="text-lg leading-none">{book.significanceScore}</span>
               </div>
            </div>
            <div className="text-center px-2">
              <h3 className="font-art-deco-title text-lg leading-tight group-hover:text-[#d4af37] transition-colors mb-1 line-clamp-2">
                {lang === 'zh-TW' && book.titleZh ? book.titleZh : book.title}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                {lang === 'zh-TW' && book.authorZh ? book.authorZh : book.author} • {book.year}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
