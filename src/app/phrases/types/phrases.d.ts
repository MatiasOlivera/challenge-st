export interface Phrase {
  id: string;
  content: string;
}

export type OnSearchChange = (searchTerm: string) => void;