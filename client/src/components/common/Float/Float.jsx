import "./styles.css";

import React, { useEffect, useRef } from 'react';
import { Popover } from "react-tiny-popover";
import useOutsideClick from "../../../hooks/useOutsideClick";

const Float = ({
    isOpen,
    close,
    className,
    renderContent = () => { },
    children,
    ...rest
}) => {
    const ref = useOutsideClick(close, { click: false, escape: true })
    const floatRef = useRef(null);

    useEffect(() => {
        function updateScrollPosition() {
            close();
        }

        if (floatRef && floatRef.current) {
            floatRef.current.addEventListener("click", updateScrollPosition, true);

            return () => {
                floatRef.current.removeEventListener("click", updateScrollPosition, true);
            }
        }
    }, [floatRef]);

    // handle cleanup e.g., page redirect to remove overlay
    useEffect(() => {
        return () => document.getElementById("app-container").classList.remove("float-options_overlay");
    }, []);

    // handle float's overlays on/off
    useEffect(() => {
        isOpen
            ? document.getElementById("app-container").classList.add("float-options_overlay")
            : document.getElementById("app-container").classList.remove("float-options_overlay");

    }, [isOpen])

    return (
        <Popover
            isOpen={isOpen}
            padding={10}
            reposition={true}
            onClickOutside={close}
            style={{ zIndex: "999999" }}
            containerClassName={`float-options ${className}`}
            parentElement={document.getElementById("app-container")}
            content={(props) => renderContent({ props, floatRef })}
            ref={ref}
            boundaryInset={10}
            {...rest}
        >
            {children}
        </Popover >
    )
}

export default Float;