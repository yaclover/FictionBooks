
import React from 'react';
import { Language } from '../types';

interface BookCoverProps {
  title: string;
  titleZh: string | null;
  author: string | null;
  authorZh: string | null;
  imageUrl: string | null;
  lang: Language;
  size?: 'sm' | 'md' | 'lg';
}

const BookCover: React.FC<BookCoverProps> = ({ title, titleZh, author, authorZh, imageUrl, lang, size = 'md' }) => {
  const dimensions = {
    sm: 'w-32 h-48',
    md: 'w-48 h-72',
    lg: 'w-64 h-96'
  };

  const displayTitle = lang === 'zh-TW' && titleZh ? titleZh : title;
  const displayAuthor = lang === 'zh-TW' && authorZh ? authorZh : author;

  const fontSizeTitle = {
    sm: 'text-[11px]',
    md: 'text-[16px]',
    lg: 'text-[22px]'
  };

  const fontSizeAuthor = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]'
  };

  return (
    <div className={`${dimensions[size]} relative overflow-hidden border-4 border-black shadow-xl group bg-[#e8e4d9]`}>
      {/* Intricate Art Deco Frame Border */}
      <div className="absolute inset-0 border-2 border-[#d4af37] m-1 pointer-events-none z-10 opacity-60"></div>
      <div className="absolute inset-0 border border-black/10 m-3 pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#d4af37] m-1 z-10"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#d4af37] m-1 z-10"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#d4af37] m-1 z-10"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#d4af37] m-1 z-10"></div>
      
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f0ede4]">
          <svg viewBox="0 0 100 150" className="w-3/4 h-3/4 opacity-10 text-black">
             {/* Symmetrical Art Deco Pattern */}
             <rect x="10" y="10" width="80" height="130" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <path d="M50 10 V140 M10 75 H90" stroke="currentColor" strokeWidth="0.2" />
             <circle cx="50" cy="75" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <path d="M25 40 L75 110 M75 40 L25 110" stroke="currentColor" strokeWidth="0.2" />
             <rect x="35" y="60" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 75)" />
          </svg>
        </div>
      )}

      {/* Title/Author Text Overlays with consistent background styling */}
      <div className="absolute inset-0 flex flex-col justify-between items-center p-3 z-20 text-black">
        <div className={`font-art-deco-title uppercase text-center bg-[#fcfaf2]/95 px-4 py-2 border-2 border-black/80 rounded-sm shadow-md leading-tight max-w-[90%] break-words ${fontSizeTitle[size]}`}>
          {displayTitle}
        </div>
        <div className={`font-art-deco-title tracking-widest uppercase text-center bg-[#fcfaf2]/95 px-3 py-1.5 border border-black/40 rounded-sm shadow-sm max-w-[85%] truncate ${fontSizeAuthor[size]}`}>
          {displayAuthor || "Unknown"}
        </div>
      </div>

      {/* Aged Paper Texture Blend */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
    </div>
  );
};

export default BookCover;
