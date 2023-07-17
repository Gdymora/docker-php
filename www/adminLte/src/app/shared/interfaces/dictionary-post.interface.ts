export interface IDictionary{
  id?: string | undefined;
  imageId?: number | undefined;
  word: Language;
  transcription?: string | undefined;
  translate: string;
  partsOfspech?: string | undefined;
  state?: 'default' | 'flipped' | 'matched';
}

export interface Language {
  [x: string]: string; 
}
