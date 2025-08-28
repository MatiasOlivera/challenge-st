import React, { useState, useDeferredValue } from "react";
import type { OnSearchChange } from "../types/phrases.d.ts";
import { useDebounce } from "@/app/hooks/useDebounce";

export function useSearch(onSearchChange: OnSearchChange, searchTermLength = 3): UseSearchHook {
    const [searchTerm, setSearchTerm] = useState("");
    const deferredSearchTerm = useDeferredValue(searchTerm);
    const debouncedSearchTerm = useDebounce(deferredSearchTerm, 300);

    React.useEffect(() => {
        if (debouncedSearchTerm.length >= searchTermLength) {
            onSearchChange(debouncedSearchTerm);
        }

    }, [debouncedSearchTerm, onSearchChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value?.trim());
    };

    return { searchTerm, handleSearchChange };
}

interface UseSearchHook {
    searchTerm: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}