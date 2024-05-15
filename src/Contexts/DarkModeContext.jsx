/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { useContext, useEffect } from "react";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const getSystemMode = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    return mediaQuery ? "dark" : "light";
  };

  const { mode, setMode } = useLocalStorage({
    initialValue: getSystemMode(),
    key: "mode",
  });

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add(`dark-mode`);
      document.documentElement.classList.remove(`light-mode`);
    } else {
      document.documentElement.classList.add(`light-mode`);
      document.documentElement.classList.remove(`dark-mode`);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  return (
    <DarkModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) throw new Error("DarkModeContext used outside of scope");

  return context;
}
