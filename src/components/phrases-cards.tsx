"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhrases } from "@/lib/phrases-context";

export function PhrasesCards() {
  const {
    state: { phrases, loading, error },
  } = usePhrases();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phrases.map((phrase) => (
        <Card key={phrase.id}>
          <CardContent>
            <p>{phrase.content}</p>
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button variant="secondary">Eliminar</Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function PhrasesCardsFallback() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
