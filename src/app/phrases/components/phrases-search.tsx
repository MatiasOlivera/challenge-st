"use client";

import React from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Search } from "lucide-react";
import { useSearch } from "@/app/phrases/hooks/useSearch";
import type { OnSearchChange } from "../types/phrases";

interface PhrasesSearchProps {
  onSearchChange: OnSearchChange
  searchTermLength?: number;
  placeholder?: string;
}

export const PhrasesSearch: React.FC<PhrasesSearchProps> = ({
  onSearchChange,
  searchTermLength = 3,
  placeholder = "Buscar frases...",

}) => {
  const { searchTerm, handleSearchChange } = useSearch(onSearchChange, searchTermLength);
  const trimmedSearchTerm = searchTerm.trim();

  return (
    <div className="relative" role="search">
      <Label htmlFor="search" className="sr-only">
        Buscar frases
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="search"
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      {trimmedSearchTerm && trimmedSearchTerm.length > searchTermLength && (
        <div className="mt-2 text-sm text-muted-foreground">
          Buscando: "{searchTerm}"
        </div>
      )}
    </div>
  );
};

