"use client";

import React, { useState, useDeferredValue } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface PhrasesSearchProps {
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
}

export const PhrasesSearch: React.FC<PhrasesSearchProps> = ({
  onSearchChange,
  placeholder = "Buscar frases...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  React.useEffect(() => {
    onSearchChange(deferredSearchTerm);
  }, [deferredSearchTerm, onSearchChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <Label htmlFor="search" className="sr-only">
        Buscar frases
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="search"
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      {searchTerm && (
        <div className="mt-2 text-sm text-muted-foreground">
          Buscando: "{searchTerm}"
        </div>
      )}
    </div>
  );
};
