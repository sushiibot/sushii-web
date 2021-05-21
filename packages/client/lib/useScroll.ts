import { useState, useEffect } from "react";
import { throttle } from "lodash";

// https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4
export default function useScroll() {
    const [scrollY, setScrollY] = useState(0);

    const listener = (e) => {
        setScrollY(window.scrollY || 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", throttle(listener, 100));

        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    return {
        scrollY,
    };
}
