import { useEffect, useRef } from "react";

export default function useOutsideClick(handler) {
    const ref = useRef();
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) handler();
        };

        document.addEventListener("click", handleClick, false);
        return () => {
            document.removeEventListener("click", handleClick, false);
        };
    }, [handler]);

    return ref;
}