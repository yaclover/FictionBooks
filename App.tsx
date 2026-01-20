
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { seedDataIfNeeded } from './store';
import Layout from './components/Layout';
import LibraryPage from './pages/LibraryPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';

const App: React.FC = () => {
  useEffect(() => {
    seedDataIfNeeded();
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LibraryPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/add" element={<AddBookPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
