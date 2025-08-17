"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePhraseForm } from "../hooks/phrases-hooks";

interface CreatePhraseFormProps {
  onSubmit: (content: string) => void;
  error?: string | null;
  isLoading?: boolean;
}

export const CreatePhraseForm: React.FC<CreatePhraseFormProps> = ({ 
  onSubmit, 
  error, 
  isLoading, 
  ...props 
}) => {
  function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    onSubmit(content);
  }

  return (
    <form action={handleSubmit} className="grid w-full gap-3" name="create-phrase-form" {...props}>
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
};

export const CreatePhraseFormContainer: React.FC = () => {
  const { error, loading, createPhrase } = usePhraseForm();

  return (
    <CreatePhraseForm
      onSubmit={createPhrase}
      error={error}
      isLoading={loading}
    />
  );
};
