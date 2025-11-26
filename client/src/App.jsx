import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ArticlePage from './components/ArticlePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/emotional-intelligence" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
