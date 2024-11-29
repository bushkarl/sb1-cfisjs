import React, { useState } from 'react';
import { useDifficultWordsStore } from '../../store/difficultWordsStore';
import { Button } from '../ui/Button';
import { Trash2, Volume2, BookOpen, Loader2 } from 'lucide-react';
import { speakText, playAudio } from '../../utils/speech';
import { useWordSet } from '../../hooks/useWordSet';

export function DifficultWordsList() {
  const { words, clearWords, removeWord } = useDifficultWordsStore();
  const wordSet = useWordSet();
  const [playingWordId, setPlayingWordId] = useState<number | null>(null);

  const handleSpeak = async (word: { id: number; word: string; audioUrl?: string }) => {
    if (playingWordId) return;
    
    setPlayingWordId(word.id);
    try {
      if (word.audioUrl) {
        await playAudio(word.audioUrl);
      } else {
        speakText(word.word, wordSet.lang, wordSet.speechRate);
      }
    } catch (error) {
      speakText(word.word, wordSet.lang, wordSet.speechRate);
    } finally {
      setPlayingWordId(null);
    }
  };

  const handleSpeakDefinition = async (word: { id: number; definition: string; definitionAudioUrl?: string }) => {
    if (playingWordId) return;
    
    setPlayingWordId(word.id);
    try {
      if (word.definitionAudioUrl) {
        await playAudio(word.definitionAudioUrl);
      } else {
        speakText(word.definition, wordSet.lang, wordSet.speechRate);
      }
    } catch (error) {
      speakText(word.definition, wordSet.lang, wordSet.speechRate);
    } finally {
      setPlayingWordId(null);
    }
  };

  if (words.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No difficult words added yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Difficult Words ({words.length})</h2>
        <Button
          onClick={clearWords}
          variant="secondary"
          className="text-sm"
          icon={<Trash2 className="w-4 h-4" />}
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-2">
        {words.map((word) => (
          <div
            key={word.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
          >
            <div>
              <div className="font-medium">{word.word}</div>
              <div className="text-sm text-gray-500">{word.pronunciation}</div>
              <div className="text-sm text-gray-600">{word.definition}</div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSpeak(word)}
                disabled={playingWordId !== null}
                className={`p-2 ${
                  playingWordId === word.id
                    ? 'text-blue-300'
                    : 'text-blue-500 hover:text-blue-600'
                } transition-colors`}
                aria-label="Speak word"
              >
                {playingWordId === word.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => handleSpeakDefinition(word)}
                disabled={playingWordId !== null}
                className={`p-2 ${
                  playingWordId === word.id
                    ? 'text-green-300'
                    : 'text-green-500 hover:text-green-600'
                } transition-colors`}
                aria-label="Speak definition"
              >
                {playingWordId === word.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => removeWord(word.id)}
                disabled={playingWordId !== null}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
                aria-label="Remove from difficult words"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}