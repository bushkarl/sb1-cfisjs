import React from 'react';

interface NavigationProps {
  onNext: () => void;
  onReset: () => void;
  isLastWord: boolean;
  currentIndex: number;
  totalWords: number;
}

export function Navigation({
  onNext,
  onReset,
  isLastWord,
  currentIndex,
  totalWords,
}: NavigationProps) {
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-600 mb-4">
        Word {currentIndex + 1} of {totalWords}
      </p>
      <div className="space-x-4">
        {isLastWord ? (
          <button
            onClick={onReset}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Start Over
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Next Word
          </button>
        )}
      </div>
    </div>
  );
}