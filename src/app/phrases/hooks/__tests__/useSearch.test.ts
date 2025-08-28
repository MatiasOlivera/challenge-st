import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../useSearch';

jest.mock('@/app/hooks/useDebounce', () => ({
  useDebounce: jest.fn((value) => value),
}));

describe('useSearch', () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns initial state', () => {
    const { result } = renderHook(() => useSearch(mockOnSearchChange));
    
    expect(result.current.searchTerm).toBe('');
    expect(typeof result.current.handleSearchChange).toBe('function');
  });

  test('updates searchTerm on input change', () => {
    const { result } = renderHook(() => useSearch(mockOnSearchChange));
    
    act(() => {
      result.current.handleSearchChange({
        target: { value: 'test' }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchTerm).toBe('test');
  });

  test('calls onSearchChange for empty string', () => {
    renderHook(() => useSearch(mockOnSearchChange));
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('');
  });

  test('calls onSearchChange for terms >= 3 characters', () => {
    const { result } = renderHook(() => useSearch(mockOnSearchChange));
    
    act(() => {
      result.current.handleSearchChange({
        target: { value: 'abc' }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockOnSearchChange).toHaveBeenCalledWith('abc');
  });

  test('does not call onSearchChange for terms 1-2 characters', () => {
    const { result } = renderHook(() => useSearch(mockOnSearchChange));
    
    mockOnSearchChange.mockClear();
    
    act(() => {
      result.current.handleSearchChange({
        target: { value: 'ab' }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockOnSearchChange).not.toHaveBeenCalledWith('ab');
  });
});