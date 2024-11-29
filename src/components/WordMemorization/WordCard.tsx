import React from 'react';
import { Volume2, BookOpen, Loader2 } from 'lucide-react';
import { Word } from '../../types/word';
import { Button } from '../ui/Button';

interface WordCardProps {
  word: Word;
  onSpeak: () => void;
  onSpeakDefinition: () => void;
  isPlaying?: boolean;
}

export function WordCard({ word, onSpeak, onSpeakDefinition, isPlaying = false }: WordCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{word.word}</h2>
        <p className="text-lg text-gray-600 mb-6">{word.pronunciation}</p>
        <p className="text-gray-700 mb-6">{word.definition}</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onSpeak}
            disabled={isPlaying}
            variant="primary"
            icon={isPlaying ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
            aria-label="Speak word"
          />
          <Button
            onClick={onSpeakDefinition}
            disabled={isPlaying}
            variant="secondary"
            icon={isPlaying ? <Loader2 className="w-6 h-6 animate-spin" /> : <BookOpen className="w-6 h-6" />}
            aria-label="Speak definition"
          />
        </div>
      </div>
    </div>
  );
}