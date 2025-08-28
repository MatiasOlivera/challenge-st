import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));
        expect(result.current).toBe('initial');
    });

    test('debounces value changes', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

        expect(result.current).toBe('initial');

        rerender({ value: 'updated', delay: 500 });
        expect(result.current).toBe('initial');

        act(() => {
            jest.advanceTimersByTime(501);
        });
        expect(result.current).toBe('updated');
    });
});