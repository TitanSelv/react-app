import { createContext, useLayoutEffect, useState } from 'react';
import { THEME_STORAGE } from '../constants';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem(THEME_STORAGE) || "system";

        if (savedTheme === "system") {
            return window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches ? "dark" : "light";
        }

        return savedTheme;
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useLayoutEffect(() => {
        const detectTheme = () => {
            const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

            const selectedTheme = localStorage.getItem(THEME_STORAGE) || "system";

            const actualTheme =
                selectedTheme === "system"
                    ? (isDark ? "dark" : "light")
                    : selectedTheme;

            setTheme(actualTheme);

            document.body.classList.toggle(
                "darkLayout",
                actualTheme === "dark"
            );
        };
        detectTheme();


        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", detectTheme);

        return () => {
            mediaQuery.removeEventListener("change", detectTheme);
        }

    }, []);





    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
