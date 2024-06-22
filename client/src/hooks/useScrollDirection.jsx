import { useState, useEffect, useRef } from "react";

const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = (scrollY > lastScrollY.current && window.pageYOffset > 50) ? "down" : "up";

            if (scrollY !== lastScrollY.current) {
                setScrollDirection(direction);
            }

            lastScrollY.current = scrollY;
        };

        const handleScroll = () => {
            window.requestAnimationFrame(updateScrollDirection);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollDirection;
};

export default useScrollDirection;