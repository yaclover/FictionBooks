
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooks, getLatestSummary, saveSummary, saveBook } from '../store';
import { Book, Summary, Language } from '../types';
import { useTranslation } from '../i18n';
import { generateDualLanguageSummary, generateArtDecoCover } from '../services/gemini';
import BookCover from '../components/BookCover';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  
  const [book, setBook] = useState<Book | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const b = getBooks().find(x => x.id === id);
    if (!b) return navigate('/');
    setBook(b);
    setSummary(getLatestSummary(b.id, lang));
    
    if (!getLatestSummary(b.id, 'en') || !getLatestSummary(b.id, 'zh-TW')) {
      handleRegenAll(b);
    }
  }, [id, navigate, lang]);

  const handleRegenAll = async (b: Book) => {
    setIsLoading(true);
    try {
      const { en, zh } = await generateDualLanguageSummary(b.title, b.author, b.year, b.titleZh, b.authorZh);
      saveSummary({ id: crypto.randomUUID(), bookId: b.id, language: 'en', summaryJson: en, createdBy: 'ai', version: 1, createdAt: Date.now() });
      saveSummary({ id: crypto.randomUUID(), bookId: b.id, language: 'zh-TW', summaryJson: zh, createdBy: 'ai', version: 1, createdAt: Date.now() });
      setSummary(lang === 'en' ? getLatestSummary(b.id, 'en') : getLatestSummary(b.id, 'zh-TW'));
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const handleRegenCover = async () => {
    if (!book) return;
    setIsLoading(true);
    try {
      const { imageUrl, prompt } = await generateArtDecoCover(book.title, book.author, summary?.summaryJson);
      const updated = { ...book, coverUrl: imageUrl, coverPrompt: prompt, coverSource: 'generated' as const };
      saveBook(updated);
      setBook(updated);
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  if (!book) return null;
  const data = summary?.summaryJson;

  return (
    <div className="max-w-6xl mx-auto py-16 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <aside className="w-full lg:w-96 flex flex-col items-center gap-10 sticky top-32">
          <BookCover title={book.title} titleZh={book.titleZh} author={book.author} authorZh={book.authorZh} imageUrl={book.coverUrl} lang={lang} size="lg" />
          <div className="flex flex-col gap-4 w-full px-4">
             <div className="bg-black text-[#d4af37] p-6 border-2 border-[#d4af37] text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2">{t('impact')}</p>
                <p className="font-art-deco-title text-6xl leading-none">{book.significanceScore}</p>
             </div>
             <button onClick={handleRegenCover} disabled={isLoading} className="w-full border-2 border-black font-bold py-4 hover:bg-black hover:text-white transition-all uppercase tracking-widest text-[10px]">
                {isLoading ? "Generating..." : t('regenerate_cover')}
             </button>
             <button onClick={() => { setEditValue(JSON.stringify(data, null, 2)); setIsEditing(true); }} className="w-full border-2 border-black font-bold py-4 hover:bg-black hover:text-white transition-all uppercase tracking-widest text-[10px]">
                {t('edit')}
             </button>
          </div>
        </aside>

        <div className="flex-grow space-y-20">
          <header className="border-b-4 border-black pb-10">
            <h1 className="text-8xl font-serif-header leading-tight mb-4 tracking-tighter">
              {lang === 'zh-TW' && book.titleZh ? book.titleZh : book.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <p className="text-3xl font-art-deco-title text-[#d4af37] uppercase tracking-widest">
                {t('by')} {lang === 'zh-TW' && book.authorZh ? book.authorZh : book.author}
              </p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {t('published')} {book.year}
              </p>
            </div>
          </header>

          {data && !isEditing && (
            <div className="space-y-24">
              <section className="relative p-12 bg-white border-2 border-black shadow-[12px_12px_0px_#d4af37]">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-[#d4af37] -m-2"></div>
                <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-[#d4af37] mb-6">{t('the_pitch')}</h3>
                <p className="text-4xl font-serif-header leading-tight italic">"{data.elevator_pitch}"</p>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400 mb-10 border-b-2 border-black pb-4">{t('storyline')}</h3>
                <div className="space-y-12">
                   {data.storyline.map((p, i) => (
                     <p key={i} className="text-2xl leading-relaxed text-gray-800 font-serif-header first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#d4af37]">
                       {p}
                     </p>
                   ))}
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-20">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400 mb-8 border-b-2 border-black pb-4">{t('characters')}</h3>
                  <div className="space-y-8">
                    {data.main_characters.map((c, i) => (
                      <div key={i} className="border-l-4 border-[#d4af37] pl-8">
                        <h4 className="font-art-deco-title text-3xl text-black mb-1">{c.name}</h4>
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">{c.role}</p>
                        <p className="text-gray-700 italic leading-relaxed">{c.motivation}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                   <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400 mb-8 border-b-2 border-black pb-4">{t('about')}</h3>
                   <p className="text-xl font-serif-header leading-relaxed text-gray-800">{data.literary_legacy}</p>
                   <div className="mt-12 bg-black text-white p-8 space-y-8">
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] mb-2 uppercase">Tone</p>
                        <p className="font-art-deco-title text-3xl">{data.reading_vibe.tone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] mb-2 uppercase">Pacing</p>
                        <p className="font-art-deco-title text-3xl">{data.reading_vibe.pacing}</p>
                      </div>
                   </div>
                </div>
              </section>

              <div className="pt-10 border-t border-black/10 flex flex-wrap gap-6">
                {data.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] font-bold uppercase tracking-[0.6em] text-gray-300 hover:text-black transition-colors cursor-default">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="space-y-10 animate-in fade-in">
              <textarea className="w-full h-[700px] border-4 border-black p-10 font-mono text-xs bg-[#fcfaf2] shadow-2xl focus:outline-none" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
              <div className="flex gap-6">
                <button onClick={() => { saveSummary({ id: crypto.randomUUID(), bookId: book.id, language: lang, summaryJson: JSON.parse(editValue), createdBy: 'user', version: (summary?.version || 1) + 1, createdAt: Date.now() }); setSummary(getLatestSummary(book.id, lang)); setIsEditing(false); }} className="bg-black text-white px-16 py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-[#d4af37]">Save</button>
                <button onClick={() => setIsEditing(false)} className="border-2 border-black px-16 py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-gray-100">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
