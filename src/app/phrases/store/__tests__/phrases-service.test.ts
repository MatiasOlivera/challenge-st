import { PhrasesService } from '../phrases-service';

describe('PhrasesService', () => {
    let service: PhrasesService;

    beforeEach(() => {
        service = new PhrasesService();
    });

    test('createPhrase creates trimmed phrase and returns it', () => {
        const res = service.createPhrase('  Hello world  ');
        expect(res).toHaveProperty('id');
        expect(res.content).toBe('Hello world');
        expect(service.getPhrasesCount()).toBe(1);
    });

    test('createPhrase throws on empty content', () => {
        expect(() => service.createPhrase('   ')).toThrow('Debes escribir una frase');
    });

    test('createPhrase throws on duplicate', () => {
        service.createPhrase('Hello world');
        expect(() => service.createPhrase('Hello world')).toThrow('Ya existe una frase igual');
    });

    test('deletePhrase removes existing phrase and throws when not found', () => {
        const phrase = service.createPhrase('one');
        expect(service.getPhrasesCount()).toBe(1);
        service.deletePhrase(phrase.id);
        expect(service.getPhrasesCount()).toBe(0);
        expect(() => service.deletePhrase(phrase.id)).toThrow('Frase no encontrada');
    });

    test('getPhraseById returns phrase or undefined', () => {
        const phrase = service.createPhrase('find me');
        expect(service.getPhraseById(phrase.id)).toEqual(phrase);
        expect(service.getPhraseById('nope')).toBeUndefined();
    });

    test('getPhrases returns all or filters by searchTerm', () => {
        service.createPhrase('One phrase');
        service.createPhrase('Another phrase');
        service.createPhrase('And the last one');
        expect(service.getPhrases().length).toBe(3);

        expect(service.getPhrases('a').length).toBe(3);
        expect(service.getPhrases('phrase').length).toBe(2);
    });

    test('searchPhrases based on search tem', () => {
        service.createPhrase('  Mixed Case  ');
        const results = service.searchPhrases('mixed');
        expect(results.length).toBe(1);
    });
});
