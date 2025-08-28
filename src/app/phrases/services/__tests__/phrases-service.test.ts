import { PhrasesService } from '../../services/phrases-service';

describe('PhrasesService', () => {
    let service: PhrasesService;

    beforeEach(() => {
        service = new PhrasesService();
    });

    test('createPhrase creates trimmed phrase and returns it', async () => {
        const res = await service.createPhrase('  Hello world  ');
        expect(res).toHaveProperty('id');
        expect(res.content).toBe('Hello world');
        expect(service.getPhrasesCount()).toBe(1);
    });

    test('createPhrase throws on empty content', () => {
        expect(async () => await service.createPhrase('   ')).toThrow('Debes escribir una frase');
    });

    test('createPhrase throws on duplicate', async () => {
        await service.createPhrase('Hello world');
        expect(async () => await service.createPhrase('Hello world')).toThrow('Ya existe una frase igual');
    });

    test('deletePhrase removes existing phrase and throws when not found', async () => {
        const phrase = await service.createPhrase('one');
        expect(service.getPhrasesCount()).toBe(1);
        await service.deletePhrase(phrase.id);
        expect(service.getPhrasesCount()).toBe(0);
        expect(async () => await service.deletePhrase(phrase.id)).toThrow('Frase no encontrada');
    });

    test('getPhraseById returns phrase or undefined', async () => {
        const phrase = await service.createPhrase('find me');
        expect(service.getPhraseById(phrase.id)).toEqual(phrase);
        expect(service.getPhraseById('nope')).toBeUndefined();
    });

    test('getPhrases returns all or filters by searchTerm', async () => {
        await service.createPhrase('One phrase');
        await service.createPhrase('Another phrase');
        await service.createPhrase('And the last one');
        expect(await service.getPhrases().length).toBe(3);

        expect(await service.getPhrases('a').length).toBe(3);
        expect(await service.getPhrases('phrase').length).toBe(2);
    });

    test('searchPhrases based on search tem', async () => {
        await service.createPhrase('  Mixed Case  ');
        const results = service.searchPhrases('mixed');
        expect(results.length).toBe(1);
    });
});
