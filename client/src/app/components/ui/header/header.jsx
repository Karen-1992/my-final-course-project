import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import productService from "../../../services/product.service";
import SearchOverlay from "../searchOverlay";
import NavBar from "./navBar";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    useEffect(() => {
        if (debouncedSearchQuery) {
            setIsSearching(true);
            productService.get({ query: searchQuery }).then(res => setResults(res.content.filteredList));
        } else {
            setResults([]);
        }
    }, [debouncedSearchQuery]);
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const clearSearchQuery = () => {
        setSearchQuery("");
    };
    return (
        <>
            <NavBar onSearchQuery={handleSearchQuery} />
            {searchQuery.length > 0 && (
                <SearchOverlay
                    items={results}
                    isSearching={isSearching}
                    clearSearchQuery={clearSearchQuery}
                />
            )}
        </>
    );
};

export default Header;
