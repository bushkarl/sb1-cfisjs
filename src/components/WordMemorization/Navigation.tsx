import React from 'react';
import { Button } from '../ui/Button';

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
          <Button
            onClick={onReset}
            variant="success"
          >
            Start Over
          </Button>
        ) : (
          <Button
            onClick={onNext}
            variant="primary"
          >
            Next Word
          </Button>
        )}
      </div>
    </div>
  );
}