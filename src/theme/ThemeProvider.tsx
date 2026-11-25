
import { createContext, useLayoutEffect, useState, type FC, type ReactNode} from 'react';
import { THEME_STORAGE } from '../constants';
import { THEME_ENUM, type IThemeContext } from '../types/global.types';

export interface IThemeProps {
    children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
    theme: THEME_ENUM.SYSTEM,
    setTheme: () => { },
});

export const ThemeProvider: FC<IThemeProps> = ({ children }) => {

    const getInitialTheme = (): THEME_ENUM => {
        const savedTheme = localStorage.getItem(THEME_STORAGE);

        if (savedTheme && Object.values(THEME_ENUM).includes(savedTheme as THEME_ENUM)) {
            if (savedTheme === THEME_ENUM.SYSTEM) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? THEME_ENUM.DARK
                    : THEME_ENUM.LIGHT;
            }

            return savedTheme as THEME_ENUM;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? THEME_ENUM.DARK
            : THEME_ENUM.LIGHT;
    };

    const [theme, setTheme] = useState<THEME_ENUM>(getInitialTheme);

    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const detectTheme = (): void => {
            const savedTheme = localStorage.getItem(THEME_STORAGE);

            const selectedTheme =
                savedTheme && Object.values(THEME_ENUM).includes(savedTheme as THEME_ENUM)
                    ? savedTheme as THEME_ENUM
                    : THEME_ENUM.SYSTEM;

            const actualTheme =
                selectedTheme === THEME_ENUM.SYSTEM
                    ? (mediaQuery.matches ? THEME_ENUM.DARK : THEME_ENUM.LIGHT)
                    : selectedTheme;

            setTheme(actualTheme);

            document.body.classList.toggle(
                'darkLayout',
                actualTheme === THEME_ENUM.DARK
            );
        };

        detectTheme();

        mediaQuery.addEventListener('change', detectTheme);

        return () => {
            mediaQuery.removeEventListener('change', detectTheme);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
