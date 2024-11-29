import { useSearchParams } from 'react-router-dom';
import { wordSets } from '../config/wordSets';

export function useWordSet() {
  const [searchParams] = useSearchParams();
  const setId = searchParams.get('set') || 'pinyin';
  const customDataPath = searchParams.get('dataPath');
  
  const selectedWordSet = wordSets[setId] || wordSets.english;
  
  // Override dataPath if provided in URL
  if (customDataPath) {
    return {
      ...selectedWordSet,
      dataPath: customDataPath,
    };
  }
  
  return selectedWordSet;
}