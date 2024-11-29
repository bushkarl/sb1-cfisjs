import { Word } from '../types/word';

export async function fetchWords(dataPath: string): Promise<Word[]> {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error('Failed to fetch words');
    }
    const data = await response.json();
    return data.words;
  } catch (error) {
    console.error('Error fetching words:', error);
    throw error;
  }
}