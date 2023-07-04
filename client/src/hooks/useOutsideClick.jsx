import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();

    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
            document.body.style.overflow = "unset";
        }
    };

    const handleEscape = (e) => {
        if (e.key === "Escape") {
            callback();
            document.body.style.overflow = "unset";
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [ref, callback]);

    return ref;
};

export default useOutsideClick;
