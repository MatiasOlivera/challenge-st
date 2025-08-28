"use client";

import React, { Suspense, use } from "react";
import { toast } from "sonner"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";

import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { usePhrasesList } from "../hooks/phrases-hooks";
import { Phrase } from "../types/phrases";
import { PhrasesSearch } from "./phrases-search";

interface PhraseCardProps {
  phrase: Phrase;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  onDelete,
  isLoading,
}) => {
  const phraseStart = (chars = 20) => `${phrase.content.substring(0, chars)}${phrase.content.length > chars ? '...' : ''}`

  return (
    <Card role="article">
      <CardContent>
        <p className="break-normal">{phrase.content}</p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button
            variant="secondary"
            onClick={() => onDelete(phrase.id)}
            disabled={isLoading}
            aria-label={`Eliminar frase: ${phraseStart()}`}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

interface PhrasesCardsProps {
  phrases: Phrase[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
  searchTerm?: string;
}

export const PhrasesCards: React.FC<PhrasesCardsProps> = ({
  phrases,
  onDelete,
  isLoading,
  searchTerm,
}) => {
  if (phrases.length === 0) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <p className="text-muted-foreground">
          {searchTerm && searchTerm.length > SEARCH_TERM_LENGTH
            ? `No se encontraron frases que coincidan con "${searchTerm}"`
            : "No hay frases aún. ¡Crea la primera!"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="feed"
      aria-label="Lista de frases"
    >
      {phrases.map((phrase) => (
        <PhraseCard
          key={phrase.id}
          phrase={phrase}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export const PhrasesCardsFallback: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PhrasesCardsContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const trimmedSearchTerm = searchTerm.trim();

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <PhrasesSearch onSearchChange={setSearchTerm} searchTermLength={SEARCH_TERM_LENGTH} />
      </div>

      <Suspense fallback={<PhrasesCardsFallback />}>
        <PhrasesCardsContent searchTerm={trimmedSearchTerm} />
      </Suspense>
    </div>
  );
};

const PhrasesCardsContent: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { phrases, loading, deletePhrase, getPhrases } = usePhrasesList();
  const filteredResults = searchTerm ? use(getPhrases(searchTerm)) : phrases;

  function onDelete(id: string) {
    deletePhrase(id);
    toast.success("Frase eliminada con éxito!");
  }

  return (
    <PhrasesCards
      phrases={filteredResults}
      onDelete={onDelete}
      isLoading={loading}
      searchTerm={searchTerm}
    />
  );
};

const SEARCH_TERM_LENGTH = 3;