import { Phrase } from "@/types/phrases";

export interface PhrasesServiceState {
  phrases: Phrase[];
}

export class PhrasesService {
  private phrases: Phrase[] = [];

  // Validation methods
  private validateContent(content: string): void {
    if (!content.trim()) {
      throw new Error("Phrase content cannot be empty");
    }
  }

  private checkDuplicate(content: string, excludeId?: string): void {
    const isDuplicate = this.phrases.some(
      (phrase) =>
        phrase.id !== excludeId &&
        phrase.content.toLowerCase().trim() === content.toLowerCase().trim()
    );

    if (isDuplicate) {
      throw new Error("A phrase with this content already exists");
    }
  }

  private findPhraseById(id: string): Phrase | undefined {
    return this.phrases.find((phrase) => phrase.id === id);
  }

  // CRUD Operations
  createPhrase(content: string): Phrase {
    this.validateContent(content);
    this.checkDuplicate(content);

    const newPhrase: Phrase = {
      id: crypto.randomUUID(),
      content: content.trim(),
    };

    this.phrases.push(newPhrase);
    return newPhrase;
  }

  deletePhrase(id: string): void {
    const existingPhrase = this.findPhraseById(id);
    if (!existingPhrase) {
      throw new Error("Phrase not found");
    }

    this.phrases = this.phrases.filter((phrase) => phrase.id !== id);
  }

  getPhraseById(id: string): Phrase | undefined {
    return this.findPhraseById(id);
  }

  getAllPhrases(): Phrase[] {
    return [...this.phrases];
  }

  // Utility methods
  searchPhrases(query: string): Phrase[] {
    const searchTerm = query.toLowerCase().trim();
    return this.phrases.filter((phrase) =>
      phrase.content.toLowerCase().includes(searchTerm)
    );
  }

  getPhrasesCount(): number {
    return this.phrases.length;
  }

  // Bulk operations
  clearAllPhrases(): void {
    this.phrases = [];
  }

  // State management
  getState(): PhrasesServiceState {
    return {
      phrases: this.getAllPhrases(),
    };
  }

  setState(state: PhrasesServiceState): void {
    this.phrases = state.phrases;
  }
}

export const phrasesService = new PhrasesService();
