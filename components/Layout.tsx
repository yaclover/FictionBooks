
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { APP_NAME } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, lang, toggleLang } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#fcfaf2] border-b-2 border-black py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-art-deco-title text-2xl rotate-45 bg-[#d4af37]">
              <span className="-rotate-45">F</span>
            </div>
            <h1 className="text-3xl font-art-deco-title tracking-tighter text-black uppercase">
              {lang === 'zh-TW' ? "小說圖書館" : "Fiction Library"}
            </h1>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-xs font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors">{t('library')}</Link>
              <Link to="/add" className="text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-[#d4af37] transition-colors rounded-sm">{t('add_book')}</Link>
            </nav>
            <div className="flex border border-black rounded-sm overflow-hidden text-[10px] font-bold uppercase tracking-widest">
              <button 
                onClick={() => toggleLang('en')}
                className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-black text-white' : 'hover:bg-black/5'}`}
              >
                EN
              </button>
              <button 
                onClick={() => toggleLang('zh-TW')}
                className={`px-3 py-1.5 transition-colors ${lang === 'zh-TW' ? 'bg-black text-white' : 'hover:bg-black/5'}`}
              >
                繁中
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        {children}
      </main>
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-art-deco-title text-2xl mb-1">{t('app_title').toUpperCase()}</h2>
            <p className="text-[10px] text-white/50 tracking-[0.3em] font-bold">ART DECO EDITION • BILINGUAL</p>
          </div>
          <div className="flex gap-4">
            <Link to="/add" className="text-[10px] border border-white/20 px-4 py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition-all uppercase tracking-widest font-bold">
              {t('add_book')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
