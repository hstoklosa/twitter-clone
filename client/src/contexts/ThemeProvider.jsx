import { useState, useEffect, useContext, createContext } from 'react';
import useLocalStroage from '../hooks/useLocalStorage';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const {
        value: savedTheme,
        setValue: saveTheme
    } = useLocalStroage('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");

    const {
        value: savedAccent,
        setValue: saveAccent
    } = useLocalStroage('accent', "blue");


    const [theme, setTheme] = useState(savedTheme);
    const [accent, setAccent] = useState(savedAccent);

    useEffect(() => {
        const flipTheme = (theme) => {
            const root = document.documentElement;
            const targetTheme = theme === 'dim' ? 'dark' : theme;

            if (targetTheme === 'dark')
                root.classList.add('dark');
            else
                root.classList.remove('dark');

            saveTheme(theme)
        };

        flipTheme(theme);
    }, [theme]);

    useEffect(() => {
        const flipAccent = (accent) => {
            const root = document.documentElement;
            root.style.setProperty('--main-accent', `var(--accent-${accent})`);

            saveAccent(accent);
        };

        flipAccent(accent);
    }, [accent]);

    const changeTheme = ({
        target: { value }
    }) => setTheme(value);

    const changeAccent = ({
        target: { value }
    }) => setAccent(value);

    const value = {
        theme,
        accent,
        changeTheme,
        changeAccent
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context)
        throw new Error('useTheme must be used within an ThemeContextProvider');

    return context;
}