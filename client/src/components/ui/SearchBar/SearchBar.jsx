import "./styles.css";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import useDebounce from "../../../hooks/useDebounce";

const SearchBar = ({ defaultSearch = true, onFocus, onChange, onSubmit, onBlur, children, ...rest }) => {
    const [search, setSearch] = useState("");

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const debouncedRequest = useDebounce(() => {
        onChange && onChange(search);
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        defaultSearch && navigate(`/search?q=${search}`, {
            state: { previousPath: pathname, },
        });

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

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            e.target.blur();
        }

        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    const handleSearchClear = () => {
        setSearch("");
    };

    return (
        <form
            className="searchbar"
        // onSubmit={handleSubmit}
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
                onKeyDown={handleKeyDown}
                {...rest}
            />

            {/* <button
                type="submit"
                hidden
            /> */}

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
        </form>
    );
};

export default SearchBar;
