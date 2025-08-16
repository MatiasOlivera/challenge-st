"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePhraseForm } from "@/lib/phrases-hooks";
import { CreatePhraseFormProps } from "@/types/components";

export function CreatePhraseForm({ onSubmit, error, isLoading, ...props }: CreatePhraseFormProps) {
  function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    onSubmit(content);
  }

  return (
    <form action={handleSubmit} className="grid w-full gap-3" {...props}>
      <Label htmlFor="content">Frase</Label>
      <Textarea
        placeholder="En qué estas pensando?"
        id="content"
        name="content"
        disabled={isLoading}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear frase"}
      </Button>
    </form>
  );
}

export function CreatePhraseFormContainer() {
  const { error, loading, createPhrase } = usePhraseForm();

  return (
    <CreatePhraseForm
      onSubmit={createPhrase}
      error={error}
      isLoading={loading}
    />
  );
}
