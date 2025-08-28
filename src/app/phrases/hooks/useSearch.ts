import { useState, useEffect } from "react";
import type { OnSearchChange } from "../types/phrases.d.ts";
import { useDebounce } from "@/app/hooks/useDebounce";

export function useSearch(onSearchChange: OnSearchChange, searchTermLength = 3): UseSearchHook {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearchTerm.length === 0 || debouncedSearchTerm.length >= searchTermLength) {
            onSearchChange(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, onSearchChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return { searchTerm, handleSearchChange };
}

interface UseSearchHook {
    searchTerm: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}