import { useState, useEffect } from 'react';
import { Word } from '../../types/word';
import { useWordSet } from '../useWordSet';
import { speakText, playAudio } from '../../utils/speech';
import { fetchWords } from '../../services/wordService';

export function useWordMemorization() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const wordSet = useWordSet();

  useEffect(() => {
    const loadWords = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedWords = await fetchWords(wordSet.dataPath);
        setWords(fetchedWords);
        setCurrentIndex(0);
      } catch (err) {
        setError('Failed to load words. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadWords();
  }, [wordSet.dataPath]);

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  const nextWord = () => {
    if (!isLastWord) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetWords = () => {
    setCurrentIndex(0);
  };

  const speakWord = async () => {
    if (currentWord && !isPlaying) {
      setIsPlaying(true);
      try {
        if (currentWord.audioUrl) {
          await playAudio(currentWord.audioUrl);
        } else {
          speakText(currentWord.word, wordSet.lang, wordSet.speechRate);
        }
      } catch (error) {
        speakText(currentWord.word, wordSet.lang, wordSet.speechRate);
      } finally {
        setIsPlaying(false);
      }
    }
  };

  const speakDefinition = async () => {
    if (currentWord && !isPlaying) {
      setIsPlaying(true);
      try {
        if (currentWord.definitionAudioUrl) {
          await playAudio(currentWord.definitionAudioUrl);
        } else {
          speakText(currentWord.definition, wordSet.lang, wordSet.speechRate);
        }
      } catch (error) {
        speakText(currentWord.definition, wordSet.lang, wordSet.speechRate);
      } finally {
        setIsPlaying(false);
      }
    }
  };

  return {
    currentWord,
    isLastWord,
    nextWord,
    resetWords,
    speakWord,
    speakDefinition,
    totalWords: words.length,
    currentIndex,
    wordSet,
    error,
    isLoading,
    isPlaying,
  };
}