"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhrasesList } from "@/lib/phrases-hooks";
import { Phrase } from "@/types/phrases";

interface PhraseCardProps {
  phrase: Phrase;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function PhraseCard({ phrase, onDelete, isLoading }: PhraseCardProps) {
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
}

interface PhrasesCardsProps {
  phrases: Phrase[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function PhrasesCards({ phrases, onDelete, isLoading }: PhrasesCardsProps) {
  if (phrases.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No hay frases aún. ¡Crea la primera!</p>
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
}

export function PhrasesCardsFallback() {
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
}

export function PhrasesCardsContainer() {
  const { phrases, loading, deletePhrase } = usePhrasesList();

  return (
    <PhrasesCards
      phrases={phrases}
      onDelete={deletePhrase}
      isLoading={loading}
    />
  );
}
