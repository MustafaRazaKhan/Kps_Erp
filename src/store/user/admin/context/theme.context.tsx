"use client";
import { createContext, useContext, useState } from "react";
type ThemeContextType = {
  theme: any;
  // setTheme:any;
  toggleTheme: any;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme((prev: any) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Error in Theme Context");
  }
  return context;
};

export default useTheme;
