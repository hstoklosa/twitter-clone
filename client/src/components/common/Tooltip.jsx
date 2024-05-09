import { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Tooltip = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator?.userAgent));
    }, []);

    if (isMobile) {
        return null;
    }

    return (
        <ReactTooltip
            id="action-tooltip"
            place="bottom"
            noArrow="true"
            clickable
            style={{
                backgroundColor: "var(--grey-2)",
                color: "#fff",
                padding: "0.13rem 0.3rem",
                fontSize: "0.7rem",
                zIndex: "999999",
            }}
            opacity={1}
            delayShow="300"
            effect='solid'
            globalCloseEvents="scroll"
        />
    )
}

export default Tooltip;