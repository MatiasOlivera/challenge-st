"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Phrase } from "@/types/phrases";
import { phrasesService } from "./phrases-service";

interface PhrasesState {
  phrases: Phrase[];
  loading: boolean;
  error: string | null;
}

type PhrasesAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PHRASES"; payload: Phrase[] }
  | { type: "ADD_PHRASE"; payload: Phrase }
  | { type: "DELETE_PHRASE"; payload: string }
  | { type: "CLEAR_ERROR" };

export interface PhrasesContextType {
  state: PhrasesState;
  createPhrase: (content: string) => void;
  deletePhrase: (id: string) => void;
  getPhrases: () => Phrase[];
  getPhraseById: (id: string) => Phrase | undefined;
}

const initialState: PhrasesState = {
  phrases: [],
  loading: false,
  error: null,
};

const phrasesReducer = (
  state: PhrasesState,
  action: PhrasesAction
): PhrasesState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_PHRASES":
      return { ...state, phrases: action.payload };

    case "ADD_PHRASE":
      return {
        ...state,
        phrases: [...state.phrases, action.payload],
        error: null,
      };

    case "DELETE_PHRASE":
      return {
        ...state,
        phrases: state.phrases.filter((phrase) => phrase.id !== action.payload),
        error: null,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

export interface PhrasesProviderProps {
  children: ReactNode;
}

export const PhrasesProvider: React.FC<PhrasesProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(phrasesReducer, initialState);

  const createPhrase = (content: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const newPhrase = phrasesService.createPhrase(content);
      dispatch({ type: "ADD_PHRASE", payload: newPhrase });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "No se pudo crear la frase",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deletePhrase = (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      phrasesService.deletePhrase(id);
      dispatch({ type: "DELETE_PHRASE", payload: id });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "No se pudo eliminar la frase",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const getPhrases = (): Phrase[] => {
    return phrasesService.getAllPhrases();
  };

  const getPhraseById = (id: string): Phrase | undefined => {
    return phrasesService.getPhraseById(id);
  };

  const value: PhrasesContextType = {
    state,
    createPhrase,
    deletePhrase,
    getPhrases,
    getPhraseById,
  };

  return (
    <PhrasesContext.Provider value={value}>{children}</PhrasesContext.Provider>
  );
};

export const usePhrases = (): PhrasesContextType => {
  const context = useContext(PhrasesContext);
  if (context === undefined) {
    throw new Error("usePhrases must be used within a PhrasesProvider");
  }
  return context;
};
