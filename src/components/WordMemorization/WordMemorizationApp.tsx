import React, { useState } from 'react';
import { WordCard } from '../WordCard';
import { Navigation } from './Navigation';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useWordMemorization } from '../../hooks/useWordMemorization';
import { Link, useSearchParams } from 'react-router-dom';
import { DifficultWordsList } from '../DifficultWords/DifficultWordsList';
import { Button } from '../ui/Button';
import { BookMarked } from 'lucide-react';

export function WordMemorizationApp() {
  const [searchParams] = useSearchParams();
  const [showDifficultWords, setShowDifficultWords] = useState(false);
  const {
    currentWord,
    isLastWord,
    nextWord,
    resetWords,
    speakWord,
    speakDefinition,
    totalWords,
    currentIndex,
    wordSet,
    error,
    isLoading,
  } = useWordMemorization();

  const isCustomDataPath = searchParams.has('dataPath');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <ErrorMessage message="No words available." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {wordSet.name}
            {isCustomDataPath && <span className="text-sm text-gray-500 ml-2">(Custom Dataset)</span>}
          </h1>
          <div className="flex gap-4 items-center">
            <Link
              to="?set=english"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              English
            </Link>
            <Link
              to="?set=pinyin"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Pinyin
            </Link>
            <Button
              onClick={() => setShowDifficultWords(!showDifficultWords)}
              variant="primary"
              icon={<BookMarked className="w-5 h-5" />}
            >
              {showDifficultWords ? 'Hide Difficult Words' : 'Show Difficult Words'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <WordCard 
              word={currentWord} 
              onSpeak={speakWord}
              onSpeakDefinition={speakDefinition}
            />
            <Navigation
              onNext={nextWord}
              onReset={resetWords}
              isLastWord={isLastWord}
              currentIndex={currentIndex}
              totalWords={totalWords}
            />
          </div>
          
          {showDifficultWords && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <DifficultWordsList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}