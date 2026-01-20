
import { Book, Summary, Language } from './types';
import { SEED_BOOKS, SEED_LIST_SOURCE, SEED_LIST_URL, COVER_STYLE_VERSION } from './constants';

const BOOKS_KEY = 'fiction_library_v3_books';
const SUMMARIES_KEY = 'fiction_library_v3_summaries';

export function getBooks(): Book[] {
  const data = localStorage.getItem(BOOKS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getSummaries(): Summary[] {
  const data = localStorage.getItem(SUMMARIES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getLatestSummary(bookId: string, lang: Language): Summary | null {
  const summaries = getSummaries().filter(s => s.bookId === bookId && s.language === lang);
  if (summaries.length === 0) return null;
  const user = summaries.filter(s => s.createdBy === 'user').sort((a, b) => b.createdAt - a.createdAt)[0];
  return user || summaries.filter(s => s.createdBy === 'ai').sort((a, b) => b.createdAt - a.createdAt)[0];
}

export function saveBook(book: Book) {
  const books = getBooks();
  const index = books.findIndex(b => b.id === book.id);
  if (index >= 0) books[index] = book; else books.push(book);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

export function saveSummary(summary: Summary) {
  const summaries = getSummaries();
  summaries.push(summary);
  localStorage.setItem(SUMMARIES_KEY, JSON.stringify(summaries));
}

export function seedDataIfNeeded() {
  if (getBooks().length === 0) {
    const newBooks = SEED_BOOKS.map((b) => ({
      ...b,
      id: crypto.randomUUID(),
      significanceScore: b.significanceScore || 5,
      coverUrl: null,
      coverSource: 'none',
      coverPrompt: null,
      coverStyleVersion: COVER_STYLE_VERSION,
      sourceName: SEED_LIST_SOURCE,
      sourceUrl: SEED_LIST_URL,
      createdAt: Date.now()
    })) as Book[];
    localStorage.setItem(BOOKS_KEY, JSON.stringify(newBooks));
  }
}
