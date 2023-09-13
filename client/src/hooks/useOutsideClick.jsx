import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();

    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    const handleEscape = (e) => {
        if (e.key === "Escape") {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [ref]);

    return ref;
};

export default useOutsideClick;
