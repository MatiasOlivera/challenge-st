"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  return (
    <Card>
      <CardContent>
        <p>{phrase.content}</p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button
            variant="secondary"
            onClick={() => onDelete(phrase.id)}
            disabled={isLoading}
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
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {searchTerm
            ? `No se encontraron frases que coincidan con "${searchTerm}"`
            : "No hay frases aún. ¡Crea la primera!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  const { phrases, loading, deletePhrase, getPhrases } = usePhrasesList();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredPhrases = useMemo(() => getPhrases(searchTerm), [phrases, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <PhrasesSearch onSearchChange={setSearchTerm} />
      </div>

      <PhrasesCards
        phrases={filteredPhrases}
        onDelete={deletePhrase}
        isLoading={loading}
        searchTerm={searchTerm}
      />
    </div>
  );
};
