import { renderHook, act } from '@testing-library/react';
import { PhrasesProvider, usePhrases } from '../phrases-context';
import { phrasesService } from '../../services/phrases-service';

jest.mock('../../services/phrases-service');

const mockPhrasesService = phrasesService as jest.Mocked<typeof phrasesService>;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PhrasesProvider>{children}</PhrasesProvider>
);

describe('PhrasesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('throws error when usePhrases is used outside provider', () => {
    expect(() => renderHook(() => usePhrases())).toThrow(
      'usePhrases must be used within a PhrasesProvider'
    );
  });

  test('provides initial state', () => {
    const { result } = renderHook(() => usePhrases(), { wrapper });

    expect(result.current.state).toEqual({
      phrases: [],
      loading: false,
      error: null,
    });
  });

  test('createPhrase success', async () => {
    const mockPhrase = { id: '1', content: 'Test phrase' };
    mockPhrasesService.createPhrase.mockResolvedValue(mockPhrase);

    const { result } = renderHook(() => usePhrases(), { wrapper });

    await act(async () => {
      await result.current.createPhrase('Test phrase');
    });

    expect(result.current.state.phrases).toContain(mockPhrase);
    expect(result.current.state.error).toBeNull();
  });

  test('createPhrase error', async () => {
    mockPhrasesService.createPhrase.mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => usePhrases(), { wrapper });

    await act(async () => {
      await result.current.createPhrase('Test phrase');
    });

    expect(result.current.state.error).toBe('Test error');
    expect(result.current.state.phrases).toHaveLength(0);
  });

  test('deletePhrase success', async () => {
    const mockPhrase = { id: '1', content: 'Test phrase' };
    mockPhrasesService.createPhrase.mockResolvedValue(mockPhrase);
    mockPhrasesService.deletePhrase.mockResolvedValue();

    const { result } = renderHook(() => usePhrases(), { wrapper });

    await act(async () => {
      await result.current.createPhrase('Test phrase');
    });

    await act(async () => {
      await result.current.deletePhrase('1');
    });

    expect(result.current.state.phrases).toHaveLength(0);
  });

  test('deletePhrase error', async () => {
    mockPhrasesService.deletePhrase.mockRejectedValue(new Error('Delete error'));

    const { result } = renderHook(() => usePhrases(), { wrapper });

    await act(async () => {
      await result.current.deletePhrase('1');
    });

    expect(result.current.state.error).toBe('Delete error');
  });

  test('getPhrases calls service', async () => {
    const mockPhrases = [{ id: '1', content: 'Test' }];
    mockPhrasesService.getPhrases.mockResolvedValue(mockPhrases);

    const { result } = renderHook(() => usePhrases(), { wrapper });

    const phrases = await result.current.getPhrases('test');

    expect(mockPhrasesService.getPhrases).toHaveBeenCalledWith('test');
    expect(phrases).toEqual(mockPhrases);
  });

  test('getPhraseById calls service', async () => {
    const mockPhrase = { id: '1', content: 'Test' };
    mockPhrasesService.getPhraseById.mockResolvedValue(mockPhrase);

    const { result } = renderHook(() => usePhrases(), { wrapper });

    const phrase = await result.current.getPhraseById('1');

    expect(mockPhrasesService.getPhraseById).toHaveBeenCalledWith('1');
    expect(phrase).toEqual(mockPhrase);
  });
});