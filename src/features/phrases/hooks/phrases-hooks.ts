import { usePhrases } from "../services/phrases-context";

export function usePhrasesData() {
  const { state, createPhrase, deletePhrase } = usePhrases();
  
  return {
    phrases: state.phrases,
    loading: state.loading,
    error: state.error,
    createPhrase,
    deletePhrase,
  };
}

export function usePhraseForm() {
  const { state, createPhrase } = usePhrases();
  
  return {
    error: state.error,
    loading: state.loading,
    createPhrase,
  };
}

export function usePhrasesList() {
  const { state, deletePhrase } = usePhrases();
  
  return {
    phrases: state.phrases,
    loading: state.loading,
    deletePhrase,
  };
}

