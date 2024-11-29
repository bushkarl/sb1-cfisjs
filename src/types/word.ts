export interface Word {
  id: number;
  word: string;
  pronunciation: string;
  definition: string;
  audioUrl?: string;
  definitionAudioUrl?: string;
}