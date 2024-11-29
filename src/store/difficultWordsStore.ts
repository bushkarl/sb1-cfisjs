import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Word } from '../types/word';

interface DifficultWordsState {
  words: Word[];
  addWord: (word: Word) => void;
  removeWord: (wordId: number) => void;
  clearWords: () => void;
  isWordDifficult: (wordId: number) => boolean;
}

export const useDifficultWordsStore = create<DifficultWordsState>()(
  persist(
    (set, get) => ({
      words: [],
      addWord: (word) => {
        const isExisting = get().words.some((w) => w.id === word.id);
        if (!isExisting) {
          set((state) => ({ words: [...state.words, word] }));
        }
      },
      removeWord: (wordId) => {
        set((state) => ({
          words: state.words.filter((word) => word.id !== wordId),
        }));
      },
      clearWords: () => set({ words: [] }),
      isWordDifficult: (wordId) => {
        return get().words.some((word) => word.id === wordId);
      },
    }),
    {
      name: 'difficult-words-storage',
    }
  )
);