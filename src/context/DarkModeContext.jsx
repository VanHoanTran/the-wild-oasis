import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );
  const toggleDarkMode = () => {
    setIsDarkMode((isDark) => !isDark);
  };
  useEffect(() => {
    document.documentElement.classList.add(
      isDarkMode ? 'dark-mode' : 'light-mode'
    );
    document.documentElement.classList.remove(
      isDarkMode ? 'light-mode' : 'dark-mode'
    );
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(
      'DarkModeCOntext was used outside DarkModeContext.Provider'
    );

  return context;
};

export { DarkModeProvider, useDarkMode };
