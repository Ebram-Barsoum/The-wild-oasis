/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export default function useLocalStorage({ initialValue, key }) {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(mode));
    }, [key, mode]);

    return { mode, setMode };
}