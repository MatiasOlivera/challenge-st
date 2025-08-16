"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePhrases } from "@/lib/phrases-hooks";

export function CreatePhraseForm() {
  const {
    state: { error },
    createPhrase,
  } = usePhrases();

  function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;

    createPhrase(content);
  }

  return (
    <form action={handleSubmit} className="grid w-full gap-3">
      <Label htmlFor="content">Frase</Label>
      <Textarea
        placeholder="En qué estas pensando?"
        id="content"
        name="content"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button>Crear frase</Button>
    </form>
  );
}
