import React, { useState, useDeferredValue } from "react";
import type { OnSearchChange } from "../types/phrases.d.ts";

export function useSearch(onSearchChange: OnSearchChange): UseSearchHook {
    const [searchTerm, setSearchTerm] = useState("");
    const deferredSearchTerm = useDeferredValue(searchTerm);

    React.useEffect(() => {
        onSearchChange(deferredSearchTerm);
    }, [deferredSearchTerm, onSearchChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return { searchTerm, handleSearchChange };
}

interface UseSearchHook {
    searchTerm: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}