import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WordMemorizationApp } from './components/WordMemorization/WordMemorizationApp';

function App() {
  return (
    <BrowserRouter>
      <WordMemorizationApp />
    </BrowserRouter>
  );
}

export default App;