import "./styles.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import useDebounce from "../../../hooks/useDebounce";

const SearchBar = ({ defaultSearch = false, onFocus, onChange, onSubmit, onBlur, children, ...rest }) => {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const debouncedRequest = useDebounce(() => {
        onChange && onChange(search);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        defaultSearch && navigate(`/search?q=${search}`);
        onSubmit && onSubmit(e, search);
    };

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
        debouncedRequest();
    };

    const handleFocus = () => {
        onFocus && onFocus();
    };

    const handleBlur = (e) => {
        onBlur && onBlur(e);
    }

    const handleSearchClear = () => {
        setSearch("");
    };

    return (
        <form
            className="searchbar"
            onSubmit={handleSubmit}
        >
            <label htmlFor="searchbar">
                <BiSearch
                    className="searchbar-icon"
                    size="20"
                />
            </label>

            <input
                type="text"
                name="searchbar"
                id="searchbar"
                autoComplete="off"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...rest}
            />

            <button
                type="submit"
                hidden
            />

            {search.length > 0 && (
                <button
                    className="clear-btn"
                    onClick={handleSearchClear}
                >
                    <IoMdClose
                        className="clear-btn_icon"
                        size="16"
                    />
                </button>
            )}

            {/* {(searchFloat && search.length > 0 && children) && (
                <FloatOptions
                    className="search-options"
                    isOpen={searchFloat}
                    onClose={() => setSearchFloat(false)}
                >
                    {children}

                </FloatOptions>
            )} */}
        </form>
    );
};

export default SearchBar;
